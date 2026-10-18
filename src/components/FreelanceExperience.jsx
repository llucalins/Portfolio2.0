import React from 'react';
import { professionalProfile } from '../data/professionalProfile';
import { useTranslation } from '../hooks/useTranslation';

const FreelanceExperience = () => {
  const { t } = useTranslation();
  return (
    <article className="freelance-experience">
      <h3>{t(professionalProfile.freelance.titleKey)}</h3>
      <p>{t(professionalProfile.freelance.descriptionKey)}</p>
    </article>
  );
};

export default FreelanceExperience;
