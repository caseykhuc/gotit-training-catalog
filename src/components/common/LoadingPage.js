import React from 'react';

const LoadingPage = () => (
  <div className="d-flex align-items-center justify-content-center" style={{ height: '20rem' }}>
    <div className="spinner-border" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
)

export default LoadingPage;
