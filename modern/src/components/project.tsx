import React from 'react';
import { motion } from 'framer-motion';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

const Project: React.FC = () => {
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "Web Portfolio",
      description: "Portfolio website for introduce myself and my projects",
      tags: ["React", "Node.js", "TypeScript"],
      link: "",
      image: "/images/shiba.jpg"
    },{
        id: 2,
        title: "Kruma Hub",
        description: "Smart assistant for Roblox game",
        tags: ["Lua"],
        link: "",
        image: "/images/kruma.png"
    },{
        id: 3,
        title: "bruh bruh bruh",
        description: "bruhhhhhh",
        tags: ["bruh"],
        link: "",
        image: ""
    }
    // Add more projects as needed
  ];

  return (
    <motion.div 
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-bold mb-6">Featured Projects</h1>
          <p className="text-xl text-gray-400">A showcase of my recent work and experiments</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                View Project
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold mb-4">Interested in collaborating?</h2>
          <p className="text-gray-400 mb-8">Let's build something amazing together</p>
          <a 
            href="#contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Project; 