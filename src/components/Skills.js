import React from 'react';
import { FaCode, FaDatabase, FaTools, FaCloud } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FaCode />,
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'TypeScript', level: 80 },
        { name: 'Vue.js', level: 75 }
      ]
    },
    {
      title: 'Backend',
      icon: <FaDatabase />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Express.js', level: 90 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 }
      ]
    },
    {
      title: 'Ferramentas',
      icon: <FaTools />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'Webpack', level: 80 },
        { name: 'Jest', level: 85 },
        { name: 'Figma', level: 70 }
      ]
    },
    {
      title: 'Cloud & DevOps',
      icon: <FaCloud />,
      skills: [
        { name: 'AWS', level: 75 },
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 70 },
        { name: 'Linux', level: 85 },
        { name: 'Kubernetes', level: 65 }
      ]
    }
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
            <p>JavaScript, TypeScript, Python, HTML, CSS</p>
          </div>
          <div className="summary-item">
            <h4>Frameworks</h4>
            <p>React, Vue.js, Node.js, Express.js</p>
          </div>
          <div className="summary-item">
            <h4>Banco de Dados</h4>
            <p>MongoDB, PostgreSQL, MySQL</p>
          </div>
          <div className="summary-item">
            <h4>Ferramentas</h4>
            <p>Git, Docker, AWS, Figma, VS Code</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 