import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MetaTagsManager from './components/MetaTagsManager';
import { LanguageProvider } from './contexts/LanguageContext';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <MetaTagsManager />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
