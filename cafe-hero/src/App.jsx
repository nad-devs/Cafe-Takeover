import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import LandingSection from './components/LandingSection'
import IntroSection from './components/IntroSection'
import PhoneMockups from './components/PhoneMockups'
import EventTimeline from './components/EventTimeline'
import Footer from './components/Footer'
import DemonLogo from './components/DemonLogo'
import DiscountModal from './components/DiscountModal'
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()

  return (
    <div className="relative">
      <DemonLogo onClick={() => setIsModalOpen(true)} scrollY={scrollY} />
      <DiscountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <LandingSection scrollY={scrollY} />
      <IntroSection />
      <PhoneMockups />
      <EventTimeline />
      <Footer />
    </div>
  )
}

export default App
