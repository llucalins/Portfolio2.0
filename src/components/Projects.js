import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaEye } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma completa de e-commerce com carrinho de compras, pagamentos e painel administrativo.',
      image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=E-commerce',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com/seu-usuario/ecommerce',
      demo: 'https://ecommerce-demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicação de gerenciamento de tarefas com drag-and-drop, notificações e colaboração em tempo real.',
      image: 'https://via.placeholder.com/400x250/764ba2/ffffff?text=Task+App',
      technologies: ['Vue.js', 'Firebase', 'Vuex', 'Vuetify'],
      category: 'frontend',
      github: 'https://github.com/seu-usuario/task-app',
      demo: 'https://task-app-demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'API REST com Node.js',
      description: 'API RESTful completa com autenticação JWT, validação de dados e documentação Swagger.',
      image: 'https://via.placeholder.com/400x250/45b7d1/ffffff?text=API+REST',
      technologies: ['Node.js', 'Express', 'JWT', 'Swagger'],
      category: 'backend',
      github: 'https://github.com/seu-usuario/api-rest',
      demo: 'https://api-demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Site portfólio responsivo com animações modernas e design minimalista.',
      image: 'https://via.placeholder.com/400x250/96ceb4/ffffff?text=Portfolio',
      technologies: ['React', 'CSS3', 'Framer Motion', 'Netlify'],
      category: 'frontend',
      github: 'https://github.com/seu-usuario/portfolio',
      demo: 'https://portfolio-demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      description: 'Dashboard de analytics com gráficos interativos, filtros avançados e exportação de dados.',
      image: 'https://via.placeholder.com/400x250/ff6b6b/ffffff?text=Dashboard',
      technologies: ['React', 'D3.js', 'Chart.js', 'Material-UI'],
      category: 'frontend',
      github: 'https://github.com/seu-usuario/dashboard',
      demo: 'https://dashboard-demo.com',
      featured: false
    },
    {
      id: 6,
      title: 'Microservices Architecture',
      description: 'Sistema de microserviços com Docker, Kubernetes e comunicação via gRPC.',
      image: 'https://via.placeholder.com/400x250/4ecdc4/ffffff?text=Microservices',
      technologies: ['Docker', 'Kubernetes', 'gRPC', 'Redis'],
      category: 'devops',
      github: 'https://github.com/seu-usuario/microservices',
      demo: 'https://microservices-demo.com',
      featured: true
    }
  ];

  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'devops', label: 'DevOps' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Meus Projetos</h2>
        
        <div className="projects-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaGithub />
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                    <button className="project-link">
                      <FaEye />
                    </button>
                  </div>
                </div>
                {project.featured && (
                  <div className="featured-badge">
                    Destaque
                  </div>
                )}
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="technology-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projects-cta">
          <p>Interessado em ver mais projetos?</p>
          <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Ver no GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects; 