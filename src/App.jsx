import { lazy, Suspense, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ScrollTrigger, markLoaded, scrollToTop, startLenis } from './lib/scroll'
import { TransitionProvider } from './lib/transition'
import Aperture from './components/Aperture'
import Cursor from './components/Cursor'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

const loaders = {
  Products: () => import('./pages/Products'),
  ProductDetail: () => import('./pages/ProductDetail'),
  WeInspect: () => import('./pages/WeInspect'),
  Industry: () => import('./pages/Industry'),
  About: () => import('./pages/About'),
  Contact: () => import('./pages/Contact'),
  NotFound: () => import('./pages/NotFound'),
}
const Products = lazy(loaders.Products)
const ProductDetail = lazy(loaders.ProductDetail)
const WeInspect = lazy(loaders.WeInspect)
const Industry = lazy(loaders.Industry)
const About = lazy(loaders.About)
const Contact = lazy(loaders.Contact)
const NotFound = lazy(loaders.NotFound)

/* Warm every route chunk once the first paint is done, so the
   aperture never opens onto a Suspense fallback. */
const preloadRoutes = () => Object.values(loaders).forEach((load) => load())
let booted = false

/* Back/forward navigation skips the aperture — just reset scroll */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    scrollToTop()
  }, [pathname])
  return null
}

/* Images arriving late change layout; keep ScrollTrigger honest */
function useRefreshOnImages() {
  useEffect(() => {
    let t
    const onLoad = (e) => {
      if (e.target.tagName !== 'IMG') return
      clearTimeout(t)
      t = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    document.addEventListener('load', onLoad, true)
    return () => document.removeEventListener('load', onLoad, true)
  }, [])
}

function Shell() {
  const apertureRef = useRef(null)
  useRefreshOnImages()

  useEffect(() => {
    startLenis()
    if (booted) return
    booted = true
    // never let a slow font CDN hold the curtain closed
    const ready = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    ready.then(() => {
      apertureRef.current?.intro()
      ScrollTrigger.refresh()
      setTimeout(markLoaded, 1000)
      setTimeout(preloadRoutes, 1800)
    })
  }, [])

  return (
    <TransitionProvider apertureRef={apertureRef}>
      <ScrollReset />
      <Cursor />
      <Header />
      <main id="main">
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/we-inspect" element={<WeInspect />} />
            <Route path="/pharmaceutical" element={<Industry slug="pharmaceutical" />} />
            <Route path="/cosmetics" element={<Industry slug="cosmetics" />} />
            <Route path="/automobile" element={<Industry slug="automobile" />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Aperture ref={apertureRef} />
    </TransitionProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
