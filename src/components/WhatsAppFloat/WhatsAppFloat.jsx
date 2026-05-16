import React from 'react';
import './WhatsAppFloat.css';

function WhatsAppFloat() {
  const msg = encodeURIComponent(
    "Hi AkshayThombare Photography! I'd like to know more about your wedding photography packages."
  );
  return (
    <a
      href={`https://wa.me/919999999999?text=${msg}`}
      className="wa-float"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" />
    </a>
  );
}

export default WhatsAppFloat;