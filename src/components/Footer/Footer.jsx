import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const quickLinks = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery',  path: '/gallery' },
  { label: 'Packages', path: '/packages' },
  { label: 'Book Now', path: '/book-now' },
];

const services = [
  'Wedding Photography',
  'Haldi & Engagement',
  'Baby & Kids Photography',
  'Maternity Shoots',
  'Birthday Celebrations',
  'Family Events',
];

const areas = [
  'Borivali', 'Dahisar', 'Kandivali',
  'Malad', 'Andheri', 'Pan Mumbai',
  'Pan India', 'International',
];

function Footer() {
  return (
    <footer className="footer">

      {/* ── Top band ── */}
      <div className="footer__band">
        <p className="footer__band-text">
          Based in <span>Mumbai</span> · Serving across India & Beyond
        </p>
        <Link to="/book-now" className="footer__band-btn">
          Book a Session <i className="fas fa-arrow-right" />
        </Link>
      </div>

      {/* ── Main grid ── */}
      <div className="footer__top">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-main">Akshay Thombare</span>
            <span className="footer__logo-sub">Photography</span>
          </div>

          <p className="footer__tagline">
            Photographs should make you feel the moment again — not just
            remember it. Based in Mumbai, capturing real emotions across
            India and beyond.
          </p>

          <div className="footer__social">
            <a
              href="https://instagram.com"
              target="_blank" rel="noreferrer"
              aria-label="Instagram"
              className="footer__social-link"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank" rel="noreferrer"
              aria-label="Facebook"
              className="footer__social-link"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank" rel="noreferrer"
              aria-label="YouTube"
              className="footer__social-link"
            >
              <i className="fab fa-youtube" />
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank" rel="noreferrer"
              aria-label="WhatsApp"
              className="footer__social-link"
            >
              <i className="fab fa-whatsapp" />
            </a>
          </div>

          {/* Rating badge */}
          <div className="footer__rating">
            <div className="footer__rating-stars">
              {[1,2,3,4,5].map(s => (
                <i key={s} className="fas fa-star" />
              ))}
            </div>
            <span>4.9 · 500+ Happy Clients</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h5 className="footer__heading">Quick Links</h5>
          <ul className="footer__list">
            {quickLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path}>
                  <i className="fas fa-chevron-right" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h5 className="footer__heading">Specialisations</h5>
          <ul className="footer__list">
            {services.map(s => (
              <li key={s}>
                <span>
                  <i className="fas fa-chevron-right" />
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas + Contact */}
        <div className="footer__col">
          <h5 className="footer__heading">Areas We Serve</h5>
          <ul className="footer__list footer__list--areas">
            {areas.map(a => (
              <li key={a}><span>{a}</span></li>
            ))}
          </ul>

          <h5 className="footer__heading" style={{ marginTop: '28px' }}>
            Contact
          </h5>
          <ul className="footer__list footer__contact">
            <li>
              <i className="fas fa-phone" />
              <a href="tel:+919999999999">+91 99999 99999</a>
            </li>
            <li>
              <i className="fas fa-envelope" />
              <a href="mailto:hello@akshay.photography">
                hello@akshay.photography
              </a>
            </li>
            <li>
              <i className="fas fa-map-marker-alt" />
              <span>Borivali West, Mumbai — 400092</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()}
          <span> Akshay Thombare Photography</span>.
          All rights reserved.
        </p>
        <p className="footer__bottom-right">
          <a href="#privacy">Privacy</a>
          <span className="footer__dot">·</span>
          <a href="#terms">Terms</a>
          <span className="footer__dot">·</span>
          <span>Made with <i className="fas fa-heart" /> in Mumbai</span>
        </p>
      </div>

    </footer>
  );
}

export default Footer;