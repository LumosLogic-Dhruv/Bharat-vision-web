import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTitle } from '../lib/useTitle'
import { COMPANY, PRODUCTS } from '../data/site'
import PageHero from '../components/PageHero'
import { Eyebrow, Reveal } from '../components/Reveal'
import { Arrow } from '../components/Button'

const EMAILJS_PUBLIC_KEY = 'MpeFXMDPtJHc7Hpeh'
const EMAILJS_SERVICE_ID = 'service_bva_contact'
const EMAILJS_TEMPLATE_ID = 'template_bva_contact'

const SUBJECTS = ['Product Inquiry', 'Request Quote', 'Technical Support', 'Other']

function Field({ label, name, type = 'text', required, textarea, ...rest }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="fld">
      <Tag name={name} type={textarea ? undefined : type} required={required} placeholder=" " rows={textarea ? 5 : undefined} {...rest} />
      <span className="fld__label">{label}{required && ' *'}</span>
      <span className="fld__line" aria-hidden="true" />
    </label>
  )
}

export default function Contact() {
  useTitle('Contact')
  const formRef = useRef(null)
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.default.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Contact' }]}
        kicker="Get in touch with our experts"
        title={<>Let's talk <em>inspection.</em></>}
        lede="Tell us about your part, your defects and your line speed. Our team will get back to you within 24 hours."
      />

      <section className="wrap pg-sec contact">
        <Reveal className="contact__form-wrap">
          <form ref={formRef} onSubmit={submit} className="cform">
            <div className="cform__head">
              <span className="mono">Send us a message</span>
              <span className="mono muted">Fields marked * are required</span>
            </div>

            <fieldset className="chips">
              <legend className="mono">I'm interested in</legend>
              {SUBJECTS.map((s) => (
                <button type="button" key={s} className={`chip ${subject === s ? 'is-on' : ''}`} onClick={() => setSubject(s)} aria-pressed={subject === s}>
                  {s}
                </button>
              ))}
              <input type="hidden" name="subject" value={subject} />
            </fieldset>

            <Field label="Full name" name="name" required autoComplete="name" />
            <div className="cform__row">
              <Field label="Email" name="email" type="email" required autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            </div>
            <label className="fld fld--select">
              <select name="machine" defaultValue="">
                <option value="">Not sure yet</option>
                {PRODUCTS.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
              </select>
              <span className="fld__label fld__label--fixed">Machine of interest</span>
              <span className="fld__line" aria-hidden="true" />
            </label>
            <Field label="Tell us about your requirement" name="message" required textarea />

            <button type="submit" className="cform__send" disabled={status === 'sending'} data-cursor="Send">
              <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
              <span className="cform__send-chip"><Arrow size={18} /></span>
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p key="ok" className="cform__msg is-ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <span className="dot dot--pass" /> Message sent — we'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p key="err" className="cform__msg is-err" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Something went wrong. Please try again, or email us at {COMPANY.emails[1]}.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>

        <div className="contact__info">
          <Eyebrow index="02">Reach us</Eyebrow>
          <Reveal className="cinfo" stagger={0.08}>
            <div className="cinfo__item">
              <span className="mono">Our address</span>
              <p>{COMPANY.address.join(' ')}</p>
              <a href={COMPANY.mapUrl} target="_blank" rel="noreferrer" className="link-u">Open in Google Maps ↗</a>
            </div>
            <div className="cinfo__item">
              <span className="mono">Contact numbers</span>
              {COMPANY.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="cinfo__big link-u">{p}</a>)}
            </div>
            <div className="cinfo__item">
              <span className="mono">Email addresses</span>
              {COMPANY.emails.map((e) => <a key={e} href={`mailto:${e}`} className="link-u cinfo__mail">{e}</a>)}
            </div>
            <div className="cinfo__item">
              <span className="mono">Business hours</span>
              {COMPANY.hours.map((h) => <p key={h}>{h}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap pg-sec pg-sec--tight">
        <Reveal className="map">
          <iframe
            title="Bharat Vision Automation location"
            src="https://maps.google.com/maps?q=Madhav%20Estate%2C%20Odhav%20Circle%2C%20Ahmedabad&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map__tag">
            <span className="mono">Find us on map</span>
            <strong>Odhav, Ahmedabad</strong>
          </div>
          <span className="crop crop--tl" /><span className="crop crop--tr" /><span className="crop crop--bl" /><span className="crop crop--br" />
        </Reveal>
      </section>
    </>
  )
}
