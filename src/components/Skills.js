import React from 'react';
import { FaCode, FaDatabase } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Linguagens de Programação',
      icon: <FaCode />,
      skills: [
        { name: 'Java', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'C#', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'Lógica de Programação', level: 90 }
      ]
    },
    {
      title: 'Frameworks & Plataformas',
      icon: <FaDatabase />,
      skills: [
        { name: '.NET', level: 85 },
        { name: 'Flutter', level: 75 },
        { name: 'Node.js', level: 70 },
        { name: 'React', level: 70 },
        { name: 'IDEs', level: 90 }
      ]
    },

  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Minhas Habilidades</h2>
        
        <div className="skills-content">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <div className="category-header">
                <div className="category-icon">
                  {category.icon}
                </div>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-summary">
          <div className="summary-item">
            <h4>Linguagens</h4>
            <p>Java, Python, C#, JavaScript, Lógica de Programação</p>
          </div>
          <div className="summary-item">
            <h4>Frameworks & Plataformas</h4>
            <p>.NET, Flutter, Node.js, React, IDEs</p>
          </div>
          <div className="summary-item">
            <h4>Conhecimentos</h4>
            <p>Algoritmos, Fluxogramas, Client-Server, Cloud Computing</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 