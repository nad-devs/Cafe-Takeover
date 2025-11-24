import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { QrCodeIcon } from '@heroicons/react/24/outline'

export default function IntroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-8"
        >
          Unforgettable Events,<br />
          <span className="text-brand-red">Perfectly Crafted</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
        >
          We create immersive experiences that turn ordinary nights into extraordinary memories.
          From intimate gatherings to grand celebrations, we handle every detail with precision and creativity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16"
        >
          {/* Email Input */}
          <form onSubmit={handleSubmit} className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="px-6 py-4 rounded-lg border-2 border-gray-300 focus:border-brand-red focus:outline-none text-lg w-full sm:w-80 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-brand-red text-white rounded-lg font-semibold hover:bg-[#7a1515] transition-colors whitespace-nowrap"
              >
                Get Started
              </button>
            </div>
          </form>

          {/* Instagram QR Code Placeholder */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-white border-4 border-brand-red rounded-lg shadow-lg flex items-center justify-center">
              <QrCodeIcon className="w-32 h-32 text-brand-red" />
            </div>
            <p className="text-sm text-gray-600 mt-3 font-semibold">Follow us on Instagram</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
