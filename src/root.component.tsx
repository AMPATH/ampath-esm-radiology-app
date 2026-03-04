import React from 'react';
import styles from './root.scss';
import ProceduresDashboard from './procedures-dashboard.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/home/procedures`}>
      <Routes>
        <Route path="/" element={<ProceduresDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
