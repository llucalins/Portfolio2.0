export const professionalProfile = {
  name: 'Lucas Virginio da Silva Santos',
  roleKey: 'profile.title',
  heroStackKeys: ['reactNative', 'react', 'typescript', 'openaiApis', 'javascript', 'nextjs', 'nodejs', 'python'],
  summaryKeys: ['profile.summaryPrimary', 'profile.summarySecondary'],
  contacts: [
    {
      id: 'email',
      labelKey: 'contact.email',
      value: 'Lvirginio.dev@gmail.com',
      href: 'mailto:Lvirginio.dev@gmail.com'
    },
    {
      id: 'github',
      labelKey: 'contact.github',
      value: 'github.com/llucalins',
      href: 'https://github.com/llucalins'
    },
    {
      id: 'linkedin',
      labelKey: 'contact.linkedin',
      value: 'linkedin.com/in/lucas-virginio-55311627b',
      href: 'https://linkedin.com/in/lucas-virginio-55311627b'
    }
  ],
  experiences: [
    {
      id: 'anderson-rios',
      periodKey: 'about.experiences.andersonRios.period',
      titleKey: 'about.experiences.andersonRios.title',
      companyKey: 'about.experiences.andersonRios.company',
      descriptionKey: 'about.experiences.andersonRios.description',
      bulletsKey: 'about.experiences.andersonRios.bullets'
    },
    {
      id: 'esperanca-instructor',
      periodKey: 'about.experiences.instructor.period',
      titleKey: 'about.experiences.instructor.title',
      companyKey: 'about.experiences.instructor.company',
      descriptionKey: 'about.experiences.instructor.description'
    },
    {
      id: 'esperanca-administrative',
      periodKey: 'about.experiences.administrative.period',
      titleKey: 'about.experiences.administrative.title',
      companyKey: 'about.experiences.administrative.company',
      descriptionKey: 'about.experiences.administrative.description'
    }
  ],
  education: [
    { id: 'systems-programmer', baseKey: 'about.educationItems.systemsProgrammer' },
    { id: 'web-development', baseKey: 'about.educationItems.webDevelopment' }
  ],
  skillCategories: [
    {
      id: 'mobile',
      titleKey: 'skills.mobile',
      skillKeys: ['reactNative']
    },
    {
      id: 'ai',
      titleKey: 'skills.ai',
      skillKeys: ['openaiApis']
    },
    {
      id: 'frontend',
      titleKey: 'skills.frontend',
      skillKeys: ['typescript', 'javascript', 'react', 'nextjs', 'html', 'css']
    },
    {
      id: 'backend',
      titleKey: 'skills.backend',
      skillKeys: ['nodejs', 'java', 'springBoot', 'python', 'restApis']
    },
    {
      id: 'data',
      titleKey: 'skills.data',
      skillKeys: ['postgresql', 'sql']
    },
    {
      id: 'delivery',
      titleKey: 'skills.delivery',
      skillKeys: ['git', 'github', 'docker']
    },
    {
      id: 'specialties',
      titleKey: 'skills.knowledge',
      skillKeys: ['architecture', 'devops', 'cicd', 'scrum']
    }
  ],
  languages: [
    { id: 'portuguese', labelKey: 'languages.portuguese' },
    { id: 'english', labelKey: 'languages.english' }
  ]
};

export const localizeSkillCategory = (category, t) => ({
  ...category,
  title: t(category.titleKey),
  skills: category.skillKeys.map((key) => t(`skills.${key}`))
});
