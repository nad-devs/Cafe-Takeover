import { motion, useTransform } from 'framer-motion'
import { useState } from 'react'

export default function IntroSection({ scrollY }) {
  const [email, setEmail] = useState('')

  // Scroll-based animations - text appears as logo shrinks
  const headingOpacity = useTransform(scrollY, [100, 250], [0, 1])
  const headingY = useTransform(scrollY, [100, 250], [30, 0])
  
  const paragraphOpacity = useTransform(scrollY, [150, 300], [0, 1])
  const paragraphY = useTransform(scrollY, [150, 300], [30, 0])
  
  const formOpacity = useTransform(scrollY, [200, 350], [0, 1])
  const formY = useTransform(scrollY, [200, 350], [30, 0])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <section className="-mt-[40vh] relative z-10 flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          style={{ opacity: headingOpacity, y: headingY }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-8"
        >
          Hangouts that feel like<br />
          <span className="text-brand-red">school break again.</span>
        </motion.h2>

        <motion.p
          style={{ opacity: paragraphOpacity, y: paragraphY }}
          className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed"
        >
          Where the only thing you need to worry about is showing up.
        </motion.p>

        <motion.div
          style={{ opacity: formOpacity, y: formY }}
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
        </motion.div>
      </div>
    </section>
  )
}
