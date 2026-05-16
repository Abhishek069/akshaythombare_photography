import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Services.css';

const services = [
  {
    icon: 'fas fa-camera',
    title: 'Wedding Photography',
    desc: 'Full-day coverage of every ritual, emotion, and celebration. From the morning prep to the final bidaai — nothing is missed.',
    features: ['Unlimited edited photos', 'RAW files on request', '2 senior photographers', 'Online gallery delivery'],
    tag: 'Most Popular',
  },
  {
    icon: 'fas fa-film',
    title: 'Cinematic Videography',
    desc: 'Hollywood-grade wedding films with colour grading, original soundtrack, and drone aerial shots woven into your love story.',
    features: ['4K resolution film', 'Drone footage included', 'Highlight reel + full film', 'Background score'],
    tag: 'Fan Favourite',
  },
  {
    icon: 'fas fa-heart',
    title: 'Pre-Wedding Shoot',
    desc: 'A relaxed session before the big day to capture your chemistry, comfort, and the unique story of your relationship.',
    features: ['3–5 hour shoot', '2 outfit changes', '50+ edited photos', 'Location of your choice'],
    tag: null,
  },
  {
    icon: 'fas fa-drone',
    title: 'Drone Videography',
    desc: 'Breathtaking aerial perspectives of your venue, procession, and celebrations that ground cameras simply cannot capture.',
    features: ['Licensed drone pilots', '4K aerial footage', 'Baraat & venue shots', 'Integrated into film'],
    tag: null,
  },
  {
    icon: 'fas fa-book-open',
    title: 'Premium Album Design',
    desc: 'Handcrafted luxury wedding albums printed on fine art paper with leather covers — a heirloom to pass down generations.',
    features: ['30–60 page spreads', 'Fine art printing', 'Leather/linen cover', 'Delivered to your door'],
    tag: null,
  },
  {
    icon: 'fas fa-globe',
    title: 'Destination Weddings',
    desc: 'We travel anywhere your love story takes us — Udaipur palaces, Goa beaches, Rajasthan forts, or international venues.',
    features: ['Pan India coverage', 'International travel', 'Full logistics handled', 'Multi-day packages'],
    tag: 'Premium',
  },
];

const process = [
  { step: '01', title: 'Enquiry & Consultation', desc: 'Reach out via WhatsApp or our form. We schedule a free call to understand your vision, venue, and requirements.' },
  { step: '02', title: 'Booking & Planning', desc: 'We lock your date with a 30% advance. A dedicated coordinator guides you through shot lists and timeline planning.' },
  { step: '03', title: 'The Wedding Day', desc: 'Our team arrives early, blends into your celebration, and captures every moment with precision and heart.' },
  { step: '04', title: 'Editing & Delivery', desc: 'Preview photos in 48 hours. Full edited gallery in 30 days. Cinematic film in 60–75 days. Album in 90 days.' },
];

function Services() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <main className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="services-hero">
        <div className="services-hero__overlay" />
        <div className="services-hero__content">
          <span className="section-tag">✦ What We Offer</span>
          <h1 className="services-hero__title">
            Services Crafted for <em>Every Love Story</em>
          </h1>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="services-grid-section">
        <div className="services-grid-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Our Services"
              titleHtml="Everything You Need, <em>Under One Roof</em>"
              center
            />
          </div>

          <div className="services__grid">
            {services.map((s, i) => (
              <div
                className="service__card reveal"
                key={s.title}
                style={{ transitionDelay: `${i * 0.1}s` }}
                ref={addRef}
              >
                {s.tag && <span className="service__tag">{s.tag}</span>}
                <div className="service__icon">
                  <i className={s.icon} />
                </div>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.desc}</p>
                <ul className="service__features">
                  {s.features.map(f => (
                    <li key={f}>
                      <i className="fas fa-check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/book-now" className="service__cta">
                  Enquire Now <i className="fas fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="process-section">
        <div className="process-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ How It Works"
              titleHtml="Our Simple <em>4-Step Process</em>"
              center
              light
            />
          </div>

          <div className="process__grid">
            {process.map((p, i) => (
              <div
                className="process__card reveal"
                key={p.step}
                style={{ transitionDelay: `${i * 0.1}s` }}
                ref={addRef}
              >
                <span className="process__step">{p.step}</span>
                <h3 className="process__title">{p.title}</h3>
                <p className="process__desc">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="process__arrow">
                    <i className="fas fa-arrow-right" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="services-cta">
        <div className="services-cta__inner reveal" ref={addRef}>
          <span className="section-tag">✦ Get Started</span>
          <h2 className="services-cta__title">
            Ready to Book Your <em>Wedding Coverage?</em>
          </h2>
          <p className="services-cta__sub">
            Dates fill up fast — especially for peak wedding season.
            Reach out today and let's start planning.
          </p>
          <div className="services-cta__btns">
            <Link to="/book-now" className="btn-primary">Book Now</Link>
            <Link to="/packages" className="btn-outline">View Packages</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Services;