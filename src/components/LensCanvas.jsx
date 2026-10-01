import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────────
   The camera lens — clean. Model + studio light + pointer
   tracking only; no rings, particles or post-processing.
───────────────────────────────────────────────────────────── */
// zenit_6_camera.glb, meshopt + WebP optimised (81 MB → 2.1 MB)
const LENS_URL = '/images/zenit_6_camera.opt.glb'
const DEG = Math.PI / 180

function LensModel() {
  const { scene } = useGLTF(LENS_URL)
  useMemo(() => {
    // world matrices must be current, or quantised (meshopt) geometry measures ~12x too small
    scene.scale.setScalar(1)
    scene.position.set(0, 0, 0)
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene, true)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const s = 3.1 / (Math.max(size.x, size.y, size.z) || 1)
    scene.scale.setScalar(s)
    scene.position.set(-center.x * s, -center.y * s, -center.z * s)
  }, [scene])
  // front glass (model's −X end) turned to face the viewer, with a
  // slight angle so the barrel's depth still reads
  return (
    <group rotation={[DEG * -8, DEG * -32, 0]}>
      <primitive object={scene} />
    </group>
  )
}

function Rig({ mouse, hovered, scroll, children }) {
  const group = useRef()
  const { camera } = useThree()

  useFrame(({ clock }, delta) => {
    const g = group.current
    if (!g) return
    const damp = Math.min(1, delta * 5)
    const { x, y } = mouse.current
    const sp = scroll.current

    g.rotation.y += (x * DEG * 28 + sp * DEG * 40 - g.rotation.y) * damp
    g.rotation.x += (-y * DEG * 28 - g.rotation.x) * damp
    g.position.x += (x * 0.35 - g.position.x) * damp
    g.position.y += (y * 0.25 + Math.sin(clock.elapsedTime * 0.7) * 0.06 - g.position.y) * damp

    const camDamp = Math.min(1, delta * 2.2)
    const targetZ = (hovered.current ? 5.9 : 7) + sp * 1.2
    camera.position.z += (targetZ - camera.position.z) * camDamp
    camera.lookAt(0, 0, 0)
  })

  return <group ref={group}>{children}</group>
}

export default function LensCanvas({ scrollRef }) {
  const mouse = useRef({ x: 0, y: 0 })
  const hovered = useRef(false)
  const localScroll = useRef(0)
  const scroll = scrollRef ?? localScroll

  useEffect(() => {
    const fn = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', fn, { passive: true })
    return () => window.removeEventListener('pointermove', fn)
  }, [])

  return (
    <div className="lens-canvas" onPointerEnter={() => (hovered.current = true)} onPointerLeave={() => (hovered.current = false)}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      >
        <ambientLight intensity={2.2} color="#f4f6ff" />
        <directionalLight intensity={4} position={[5, 8, 6]} />
        <directionalLight intensity={2.4} color="#e6ecff" position={[-6, 2, 4]} />
        <pointLight intensity={3} distance={18} position={[0, 0, 8]} />
        <Suspense fallback={null}>
          {/* Local studio softboxes — no HDR download, crisp glass reflections */}
          <Environment resolution={256} background={false}>
            <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
            <Lightformer form="rect" intensity={2} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
            <Lightformer form="rect" intensity={2} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
            <Lightformer form="ring" intensity={2.5} color="#9db4ff" position={[0, 0, -5]} scale={3} />
            <Lightformer form="rect" intensity={1.2} position={[0, -4, 3]} rotation-x={-Math.PI / 2} scale={[8, 3, 1]} />
          </Environment>
        </Suspense>
        <Suspense fallback={null}>
          <Rig mouse={mouse} hovered={hovered} scroll={scroll}>
            <LensModel />
          </Rig>
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(LENS_URL)
