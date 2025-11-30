import { useState } from 'react'
import { useScroll } from 'framer-motion'
import LandingSection from './components/LandingSection'
import IntroSection from './components/IntroSection'
import PhoneMockups from './components/PhoneMockups'
import EventTimeline from './components/EventTimeline'
import Footer from './components/Footer'
import DemonLogo from './components/DemonLogo'
import InstagramButton from './components/InstagramButton'
import DiscountModal from './components/DiscountModal'
import EventSignUp from './pages/EventSignUp'
import './App.css'


const eventConfig = {
  id: 'mystery-rooms-2024',
  name: 'Mystery Rooms Takeover',
  fields: ['fullName', 'email', 'phone', 'dietaryPreference', 'teamSize']
};

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { scrollY } = useScroll()

  return (
    <div className="relative">
      <InstagramButton />
      <DemonLogo onClick={() => setIsModalOpen(true)} scrollY={scrollY} />
      <DiscountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <LandingSection scrollY={scrollY} />
      <IntroSection />
      <PhoneMockups />
      <EventTimeline />
      <EventSignUp eventConfig={eventConfig} />
      <Footer />
    </div>
  )
}

export default App
