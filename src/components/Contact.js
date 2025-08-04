import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import GooeyNav from './GooeyNav';
import './Contact.css';

const Contact = () => {
  const contactItems = [
    { 
      label: "Email", 
      href: "mailto:lvirginio.dev@gmail.com",
      info: "lvirginio.dev@gmail.com",
      icon: <FaEnvelope />
    },
    { 
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/lucas-virginio-55311627b",
      info: "linkedin.com/in/lucas-virginio-55311627b",
      icon: <FaLinkedin />
    },
    { 
      label: "GitHub", 
      href: "https://github.com/llucalins",
      info: "github.com/llucalins",
      icon: <FaGithub />
    },
    { 
      label: "WhatsApp", 
      href: "https://wa.me/5583986023472",
      info: "+55 (83) 98602-3472",
      icon: <FaWhatsapp />
    },
    { 
      label: "Localização", 
      href: null,
      info: "Campina Grande, PB - Brasil",
      icon: <FaMapMarkerAlt />
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <h3>Vamos Conversar!</h3>
            <p>
              Estou sempre aberto a novas oportunidades e colaborações interessantes. 
              Se você tem um projeto em mente ou gostaria de discutir possibilidades, 
              não hesite em entrar em contato através de qualquer uma das opções abaixo!
            </p>
          </div>
          
          <div className="gooey-nav-wrapper">
            <GooeyNav
              items={contactItems}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 