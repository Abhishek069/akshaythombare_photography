import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css';

function PageTransition() {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Trigger overlay on every route change
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 1000);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className={`page-transition ${animating ? 'page-transition--active' : ''}`}>
      <span className="page-transition__logo">ATP</span>
    </div>
  );
}

export default PageTransition;