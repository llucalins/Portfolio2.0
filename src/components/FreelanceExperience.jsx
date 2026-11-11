import React from 'react';
import { professionalProfile } from '../data/professionalProfile';
import { useTranslation } from '../hooks/useTranslation';

const FreelanceExperience = () => {
  const { t } = useTranslation();
  return (
    <p className="independent-intro">{t(professionalProfile.independent.descriptionKey)}</p>
  );
};

export default FreelanceExperience;
