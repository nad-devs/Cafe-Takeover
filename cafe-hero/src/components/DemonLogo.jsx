import { motion, useTransform } from 'framer-motion'

export default function DemonLogo({ onClick, scrollY }) {
  // Logo appears in top-right after scrolling
  const opacity = useTransform(scrollY, [250, 350], [0, 1])
  const scale = useTransform(scrollY, [250, 350], [0.5, 1])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed top-6 right-6 z-50 cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
        <span className="text-3xl">😈</span>
      </div>
    </motion.div>
  )
}
