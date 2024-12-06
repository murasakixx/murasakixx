import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Project from './components/project.tsx'

const App = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    // Validate environment variables
    if (!import.meta.env.VITE_EMAILJS_SERVICE_ID ||
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.error('Missing EmailJS configuration')
      setFormStatus('error')
      return
    }

    try {
      setFormStatus('sending')
      
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current
      )

      console.log('Success:', result)
      setFormStatus('sent')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)

    } catch (error) {
      console.error('Detailed error:', error)
      setFormStatus('error')
      
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full p-4 backdrop-blur-sm bg-black/70 z-50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Murasakix</h1>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-sm hover:text-gray-300 transition-colors">About</a>
            <a href="#projects" className="text-sm hover:text-gray-300 transition-colors">Projects</a>
            <a href="#contact" className="text-sm hover:text-gray-300 transition-colors">Contact</a>
          </div>
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden overflow-hidden bg-black/95"
        >
          <div className="px-4 py-3 space-y-3">
            <a 
              href="#about" 
              className="block text-sm hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="block text-sm hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="block text-sm hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center bg-gradient-to-b from-black to-gray-900">
        <div className="space-y-8 p-4">
          <motion.h1 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="text-6xl md:text-8xl font-bold tracking-tight"
          >
            Hi, I'm <span className="text-blue-500">Thummarat</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            A developer crafting beautiful digital experiences
          </motion.p>
          <motion.button 
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            View My Work
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">About Me</h2>
          <div className="grid md:grid-cols-1 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a developer with expertise in creating modern web applications. 
                My journey in technology started with a curiosity about how things work, 
                and it has evolved into a professional career building digital solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/50 rounded-xl">
                  <h3 className="font-bold mb-2">Frontend</h3>
                  <p className="text-gray-400">React, TypeScript, Tailwind</p>
                </div>
                <div className="p-4 bg-black/50 rounded-xl">
                  <h3 className="font-bold mb-2">Backend</h3>
                  <p className="text-gray-400">Node.js, MongoDB, Express</p>
                </div>
              </div>
            </motion.div>
            {/* <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden group perspective-1000"
            >
              <div className="absolute w-[430px] inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                <img 
                  src={profileImage} 
                  alt="Thummarat's profile" 
                  className="object-cover object-top rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-2xl"></div>
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section>
        <Project />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16">Let's Connect</h2>
          <div className="space-y-8">
            <p className="text-xl text-gray-300">
              Interested in working together? Let's talk about your project.
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div className="space-y-4">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name" 
                  required
                  className="w-full p-4 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  required
                  className="w-full p-4 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message" 
                  required
                  rows={4} 
                  className="w-full p-4 bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                ></textarea>
              </div>
              <motion.button 
                type="submit"
                disabled={formStatus === 'sending'}
                whileHover={{ scale: formStatus === 'sending' ? 1 : 1.05 }}
                whileTap={{ scale: formStatus === 'sending' ? 1 : 0.95 }}
                className={`w-full md:w-auto px-8 py-4 rounded-full transition-all transform 
                  ${formStatus === 'sending' ? 'bg-gray-600 cursor-not-allowed' : 
                    formStatus === 'sent' ? 'bg-green-500' :
                    formStatus === 'error' ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {formStatus === 'sending' ? 'Sending...' :
                 formStatus === 'sent' ? 'Message Sent!' :
                 formStatus === 'error' ? 'Error Sending' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default App
