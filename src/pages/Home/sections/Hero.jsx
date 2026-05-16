import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const stats = [
  { num: '500+', label: 'Weddings Captured' },
  { num: '12+',  label: 'Years of Experience' },
  { num: '98%',  label: 'Happy Couples' },
  { num: '15+',  label: 'Cities Covered' },
];

function Hero() {
  return (
    <section className="hero">
      {/* Background image — replace src with your local hero photo */}
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="hero__content">
        <span className="hero__badge">✦ India's Most Trusted Wedding Photographers</span>

        <h1 className="hero__title">
          Every Frame Tells
          <em>Your Love Story</em>
        </h1>

        <p className="hero__sub">
          Cinematic wedding photography &amp; videography across India.
          We don't just capture moments — we preserve emotions for a lifetime.
        </p>

        <div className="hero__btns">
          <Link to="/book-now" className="btn-primary">Book Your Date</Link>
          <Link to="/gallery"  className="btn-outline">View Our Work</Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="hero__stats">
        {stats.map(s => (
          <div className="hero__stat" key={s.label}>
            <span className="hero__stat-num">{s.num}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;