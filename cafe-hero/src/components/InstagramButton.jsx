import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'

export default function InstagramButton() {
  const handleClick = () => {
    window.open('https://www.instagram.com/cafetakeover.in/', '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-6 left-6 z-50 cursor-pointer"
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
