import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery',  path: '/gallery' },
  { label: 'Packages', path: '/packages' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-main">Akshay Thombare</span>
          <span className="navbar__logo-sub">Photography</span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link
                  ${location.pathname === link.path ? 'navbar__link--active' : ''}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <Link to="/book-now" className="navbar__cta">
          Book Now
        </Link>

        {/* ── Hamburger ── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar__drawer-link
              ${location.pathname === link.path ? 'active' : ''}
            `}
            style={{ animationDelay: `${i * 0.07}s` }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="navbar__drawer-num">0{i + 1}</span>
            {link.label}
          </Link>
        ))}

        <Link
          to="/book-now"
          className="navbar__drawer-cta"
          onClick={() => setMenuOpen(false)}
        >
          Book a Session
        </Link>

        <div className="navbar__drawer-bottom">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
            <i className="fab fa-youtube" />
          </a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;