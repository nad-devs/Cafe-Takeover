import { motion, useTransform } from 'framer-motion'

export default function LandingSection({ scrollY }) {
  // Transform logo size and position based on scroll
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.15])
  const logoY = useTransform(scrollY, [0, 300], [0, -45])
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0])

  return (
    <section className="h-screen flex items-start justify-center pt-12 relative overflow-hidden">
      <motion.div
        style={{
          scale: logoScale,
          y: logoY,
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.img
          src="/logo.png"
          alt="Cafe Takeover Logo"
          className="w-[450px] md:w-[650px] h-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-brand-red tracking-tight -mt-20"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          CAFE TAKEOVER
        </motion.h1>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-brand-red text-4xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  )
}
