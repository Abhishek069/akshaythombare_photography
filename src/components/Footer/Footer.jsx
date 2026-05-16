import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { label: 'About Us',     path: '/about' },
  { label: 'Services',     path: '/services' },
  { label: 'Gallery',      path: '/gallery' },
  { label: 'Packages',     path: '/packages' },
  { label: 'Book Now',     path: '/book-now' },
];

const services = [
  'Wedding Photography',
  'Pre-Wedding Shoots',
  'Candid Photography',
  'Drone Videography',
  'Album Design',
  'Destination Weddings',
];

const cities = [
  'Mumbai', 'Jaipur', 'Delhi NCR',
  'Bangalore', 'Pune', 'Pan India + International',
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            AkshayThombare<span> Photography</span>
          </Link>
          <p className="footer__tagline">
            India's most trusted wedding photography studio. We capture not
            just moments, but the emotions behind them — for you to treasure
            forever.
          </p>
          <div className="footer__social">
            <a href="https://www.instagram.com/akshaythombare_photography" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.facebook.com/share/1BVKsCSuBp/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            {/* <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
              <i className="fab fa-pinterest-p" />
            </a> */}
            <a href="https://wa.me/918424869624" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fab fa-whatsapp" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h5 className="footer__heading">Quick Links</h5>
          <ul className="footer__list">
            {quickLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h5 className="footer__heading">Services</h5>
          <ul className="footer__list">
            {services.map(s => (
              <li key={s}><span>{s}</span></li>
            ))}
          </ul>
        </div>

        {/* Cities */}
        <div className="footer__col">
          <h5 className="footer__heading">Cities We Serve</h5>
          <ul className="footer__list">
            {cities.map(c => (
              <li key={c}><span>{c}</span></li>
            ))}
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© 2025 <span>AkshayThombare Photography</span>. All rights reserved. Crafted with ❤️ for every love story.</p>
        <p>
          <a href="#privacy">Privacy Policy</a>
          &nbsp;|&nbsp;
          <a href="#terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;