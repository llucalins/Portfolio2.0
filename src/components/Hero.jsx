import React from 'react';
import { Link } from 'react-router-dom';
import SideRays from './SideRays';
import TechText from './TechText';
import { useTranslation } from '../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-rays" aria-hidden="true">
        <SideRays
          speed={2.2}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={1.4}
          spread={1.6}
          origin="top-right"
          tilt={0}
          saturation={1.2}
          blend={0.65}
          falloff={1.6}
          opacity={0.75}
        />
      </div>

      <div className="hero-shell">
        <h1 id="hero-title" className="visually-hidden">Lucas Virginio</h1>

        <div className="hero-tech-text" aria-hidden="true">
          <div className="hero-tech-text-frame">
            <TechText
              text="Lucas Virginio"
              fontWeight={600}
              fontSize={100}
              color="#F4F3EF"
              accentColor="#F4F3EF"
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
            />
          </div>
        </div>

        <div className="hero-intro">
          <p className="hero-role" lang="en">Full Stack Developer</p>
          <p className="hero-stack">React <span>·</span> JavaScript <span>·</span> TypeScript <span>·</span> Vite <span>·</span> Java <span>·</span> Spring Boot <span>·</span> PostgreSQL</p>
          <p className="hero-description">{t('hero.description')}</p>

          <div className="hero-actions">
            <Link className="hero-action hero-action-primary" to="/work">
              {t('nav.projects')} <span aria-hidden="true">↘</span>
            </Link>
            <Link className="hero-action hero-action-secondary" to="/contact">
              {t('hero.contactMe')} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
