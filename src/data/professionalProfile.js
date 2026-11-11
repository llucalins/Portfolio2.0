export const professionalProfile = {
  name: 'Lucas Virginio da Silva Santos',
  roleKey: 'profile.title',
  portfolio: { value: 'lucasvirginio.is-a.dev', href: 'https://lucasvirginio.is-a.dev/' },
  resume: {
    projectIds: ['sistema-agendamento', 'info-dbeta', 'mr-roobot-ai-office'],
    certificateFilenames: ['EABD3805.pdf', 'OPCYCM0Y.pdf', 'HCRDIGHK.pdf'],
    experienceBullets: {
      'anderson-rios': 'resumePdf.andersonEditorialBullets',
      'esperanca-instructor': 'resumePdf.instructorBullets'
    }
  },
  heroStackKeys: ['typescript', 'react', 'nextjs', 'nodejs', 'postgresql', 'restApis', 'openaiApis'],
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
  independent: {
    descriptionKey: 'experience.independentIntro',
    pdfDescriptionKey: 'resumePdf.independentDescription'
  },
  experiences: [
    {
      id: 'anderson-rios',
      periodKey: 'about.experiences.andersonRios.period',
      titleKey: 'about.experiences.andersonRios.title',
      companyKey: 'about.experiences.andersonRios.company',
      descriptionKey: 'about.experiences.andersonRios.description',
      bulletsKey: 'about.experiences.andersonRios.bullets',
      resumeBulletsKey: 'resumePdf.andersonRiosBullets'
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
      id: 'frontend',
      titleKey: 'skills.frontend',
      skillKeys: ['typescript', 'react', 'nextjs', 'javascript', 'reactNative', 'html', 'css']
    },
    {
      id: 'backend',
      titleKey: 'skills.backend',
      skillKeys: ['nodejs', 'java', 'springBoot', 'python', 'restApis', 'openaiApis']
    },
    {
      id: 'data',
      titleKey: 'skills.data',
      skillKeys: ['postgresql', 'sql', 'amazonS3', 'cloudfront', 'awsIam']
    },
    {
      id: 'engineering',
      titleKey: 'skills.engineering',
      skillKeys: ['git', 'github', 'docker', 'awsCli', 'architecture', 'automatedTests', 'debugging', 'deployAutomation', 'documentation']
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
