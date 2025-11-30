import { motion, useTransform } from 'framer-motion'
import { Instagram } from 'lucide-react'

export default function InstagramButton({ scrollY }) {
  const handleClick = () => {
    window.open('https://www.instagram.com/cafetakeover.in/', '_blank')
  }

  // Instagram appears in top-right after scrolling (same as DemonLogo was)
  const opacity = useTransform(scrollY, [250, 350], [0, 1])
  const scale = useTransform(scrollY, [250, 350], [0.5, 1])

  return (
    <motion.div
      style={{ opacity, scale }}
      className="fixed top-6 right-6 z-50 cursor-pointer"
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
        <Instagram className="w-8 h-8 text-white" strokeWidth={2.5} />
      </div>
    </motion.div>
  )
}
