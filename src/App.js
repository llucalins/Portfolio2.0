import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';
import MetaTagsManager from './components/MetaTagsManager';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <MetaTagsManager />
      <div className="App">
        {/* Background Particles */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0 
        }}>
          <Particles
            particleColors={['#667eea', '#764ba2']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        
        {/* Conteúdo do site */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App; 