import React from 'react';

import '../css/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-grid">
      <div>Loading...</div>
      <div className="loading-spinner"></div>
    </div>
  )
};

export default LoadingSpinner;
