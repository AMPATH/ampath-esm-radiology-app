import React from 'react';
import styles from './root.scss';
import RadiologyDashboard from './radiology-dashboard.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/home/radiology`}>
      <Routes>
        <Route path="/" element={<RadiologyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
