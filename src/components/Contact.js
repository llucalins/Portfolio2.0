import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status após 3 segundos
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'seu-email@exemplo.com',
      link: 'mailto:seu-email@exemplo.com'
    },
    {
      icon: <FaPhone />,
      title: 'Telefone',
      value: '+55 (11) 99999-9999',
      link: 'tel:+5511999999999'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Localização',
      value: 'São Paulo, SP - Brasil',
      link: null
    },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/seu-usuario',
      link: 'https://linkedin.com/in/seu-usuario'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub',
      value: 'github.com/seu-usuario',
      link: 'https://github.com/seu-usuario'
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: '+55 (11) 99999-9999',
      link: 'https://wa.me/5511999999999'
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Entre em Contato</h2>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Vamos Conversar!</h3>
            <p>
              Estou sempre aberto a novas oportunidades e colaborações interessantes. 
              Se você tem um projeto em mente ou gostaria de discutir possibilidades, 
              não hesite em entrar em contato!
            </p>
            
            <div className="contact-methods">
              {contactInfo.map((info, index) => (
                <div key={index} className="contact-method">
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="seu-email@exemplo.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Assunto *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="Qual o motivo do contato?"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensagem *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  placeholder="Conte-me sobre seu projeto ou proposta..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="success-message">
                  Mensagem enviada com sucesso! Entrarei em contato em breve.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 