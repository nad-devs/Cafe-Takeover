import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

export default function PhoneMockups() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Parallax transforms for each phone
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

  const phones = [
    {
      id: 1,
      y: y1,
      delay: 0.2,
      videoPlaceholder: 'https://via.placeholder.com/400x800/9f1c1b/ffffff?text=Event+1'
    },
    {
      id: 2,
      y: y2,
      delay: 0.4,
      videoPlaceholder: 'https://via.placeholder.com/400x800/7a1515/ffffff?text=Event+2'
    },
    {
      id: 3,
      y: y3,
      delay: 0.6,
      videoPlaceholder: 'https://via.placeholder.com/400x800/9f1c1b/ffffff?text=Event+3'
    }
  ]

  return (
    <section ref={containerRef} className="min-h-screen py-20 px-6 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-20"
      >
        Experience the <span className="text-brand-red">Magic</span>
      </motion.h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {phones.map((phone, index) => (
          <motion.div
            key={phone.id}
            style={{ y: phone.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: phone.delay }}
            className="relative"
          >
            {/* Phone Frame */}
            <div className="relative w-64 h-[500px] bg-black rounded-5xl p-3 shadow-2xl">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>

              {/* Screen */}
              <div className="w-full h-full bg-gray-900 rounded-4xl overflow-hidden relative">
                <img
                  src={phone.videoPlaceholder}
                  alt={`Event ${phone.id}`}
                  className="w-full h-full object-cover"
                />

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-brand-red ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-brand-red/20 rounded-5xl blur-2xl -z-10 scale-105"></div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
