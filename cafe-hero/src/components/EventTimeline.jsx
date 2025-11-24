import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { MapPinIcon, CalendarIcon } from '@heroicons/react/24/solid'

const events = [
  {
    id: 1,
    name: 'Neon Nights Festival',
    date: 'October 2024',
    location: 'Downtown Warehouse',
    image: 'https://via.placeholder.com/600x400/9f1c1b/ffffff?text=Neon+Nights',
    side: 'left'
  },
  {
    id: 2,
    name: 'Jazz & Wine Evening',
    date: 'September 2024',
    location: 'Rooftop Lounge',
    image: 'https://via.placeholder.com/600x400/7a1515/ffffff?text=Jazz+Wine',
    side: 'right'
  },
  {
    id: 3,
    name: 'Summer Rooftop Party',
    date: 'August 2024',
    location: 'Sky Garden',
    image: 'https://via.placeholder.com/600x400/9f1c1b/ffffff?text=Summer+Party',
    side: 'left'
  },
  {
    id: 4,
    name: 'Electronic Dreams',
    date: 'July 2024',
    location: 'Underground Club',
    image: 'https://via.placeholder.com/600x400/7a1515/ffffff?text=Electronic+Dreams',
    side: 'right'
  }
]

function EventCard({ event, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div
      ref={ref}
      className={`flex flex-col ${event.side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 relative`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand-red rounded-full border-4 border-white shadow-lg z-10 hidden md:block"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: event.side === 'left' ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: event.side === 'left' ? -50 : 50 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
          <div className="relative h-64 overflow-hidden group">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-bold text-white mb-2">{event.name}</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3 text-gray-600 mb-3">
              <CalendarIcon className="w-5 h-5 text-brand-red" />
              <span className="font-semibold">{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPinIcon className="w-5 h-5 text-brand-red" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block"></div>
    </div>
  )
}

export default function EventTimeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-20 px-6 relative">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4"
      >
        Our <span className="text-brand-red">Journey</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl text-center text-gray-600 mb-20 max-w-2xl mx-auto"
      >
        Explore the memorable events we've brought to life
      </motion.p>

      <div className="max-w-6xl mx-auto relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block">
          <motion.div
            style={{ height: lineHeight }}
            className="w-full bg-brand-red origin-top"
          />
        </div>

        {/* Events */}
        <div className="space-y-20 md:space-y-32">
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
