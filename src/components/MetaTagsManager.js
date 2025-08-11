import React from 'react';
import { useMetaTags } from '../hooks/useMetaTags';

const MetaTagsManager = () => {
  useMetaTags();
  
  // Este componente não renderiza nada visualmente
  // Ele apenas gerencia as meta tags
  return null;
};

export default MetaTagsManager;
