import React from 'react';
import { useLocation } from 'react-router-dom';

const GenericPage = ({ title }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  
  const displayTitle = category ? `${category} Collection` : title;

  return (
    <div className="container" style={{ padding: '8rem 2rem', minHeight: '60vh', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--brand-primary)', marginBottom: '2rem' }}>{displayTitle}</h1>
      <div className="brand-line" style={{ margin: '0 auto 3rem' }}></div>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
        This page is currently under construction. Please check back later to view our exclusive {displayTitle.toLowerCase()}.
      </p>
    </div>
  );
};

export default GenericPage;
