import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const stats = [
  { num: '500+', label: 'Events Covered' },
  { num: '5+',   label: 'Years Experience' },
  { num: '20+',  label: 'Cities Covered' },
  { num: '4.9★', label: 'Client Rating' },
];

function Hero() {
  const bgRef      = useRef(null);
  const contentRef = useRef(null);

  // ── Parallax on scroll ──
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${y * 0.45}px)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.15}px)`;
        contentRef.current.style.opacity   = `${1 - y / 600}`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">

      {/* ── Parallax background ── */}
      <div className="hero__bg" ref={bgRef} />

      {/* ── Overlays ── */}
      <div className="hero__overlay" />
      <div className="hero__noise"  />

      {/* ── Animated grain texture ── */}
      <div className="hero__grain" />

      {/* ── Decorative lines ── */}
      <div className="hero__lines">
        <span /><span /><span />
      </div>

      {/* ── Main content ── */}
      <div className="hero__content" ref={contentRef}>

        {/* Badge */}
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Mumbai's Cinematic Photography Studio
          <span className="hero__badge-dot" />
        </div>

        {/* Title — word by word reveal */}
        <h1 className="hero__title">
          <span className="hero__title-line">
            <span className="hero__word hero__word--1">We Don't</span>
            <span className="hero__word hero__word--2 hero__word--italic">
              Just
            </span>
          </span>
          <span className="hero__title-line">
            <span className="hero__word hero__word--3">Capture</span>
            <span className="hero__word hero__word--4 hero__word--gold">
              Moments.
            </span>
          </span>
          <span className="hero__title-line hero__title-line--sub">
            <span className="hero__word hero__word--5">
              We Make You
            </span>
            <span className="hero__word hero__word--6 hero__word--italic">
              Feel Them Again.
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero__sub">
          Cinematic photography &amp; films across Mumbai and beyond.
          Real emotions. Genuine stories. Timeless memories.
        </p>

        {/* CTAs */}
        <div className="hero__btns">
          <Link to="/book-now" className="btn-primary">
            Book a Session
            <i className="fas fa-arrow-right" />
          </Link>
          <Link to="/gallery" className="btn-outline">
            View Our Work
          </Link>
        </div>

        {/* Scroll hint */}
        <div className="hero__scroll-hint">
          <span className="hero__scroll-line" />
          <span className="hero__scroll-label">Scroll</span>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="hero__stats">
        {stats.map((s, i) => (
          <div
            className="hero__stat"
            key={s.label}
            style={{ animationDelay: `${1.2 + i * 0.15}s` }}
          >
            <span className="hero__stat-num">{s.num}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Hero;