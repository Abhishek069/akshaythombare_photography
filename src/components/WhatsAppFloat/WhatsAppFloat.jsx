import React, { useState, useEffect } from 'react';
import './WhatsAppFloat.css';

function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  // Show after scrolling 300px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const msg = encodeURIComponent(
    "Hi Akshay! I'd like to know more about your photography packages."
  );

  return (
    <a
      href={`https://wa.me/919999999999?text=${msg}`}
      className={`wa-float ${visible ? 'wa-float--visible' : ''}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="wa-float__ring" />
      <i className="fab fa-whatsapp" />
    </a>
  );
}

export default WhatsAppFloat;