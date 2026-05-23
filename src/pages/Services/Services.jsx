import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Services.css';

const services = [
  {
    id: 'wedding',
    icon: 'fas fa-ring',
    title: 'Wedding Photography & Films',
    tag: 'Most Popular',
    tagColor: 'gold',
    desc: 'Full-day cinematic coverage of your wedding — every ritual, emotion, and celebration documented with precision and heart. From the morning prep to the final bidaai, nothing is missed.',
    features: [
      '2 Senior Photographers',
      'Full Day Coverage',
      '600+ Edited Photos',
      'Cinematic Highlight Film',
      'Drone Coverage',
      'Online Gallery Delivery',
    ],
    highlight: 'Starting ₹55,000',
  },
  {
    id: 'haldi',
    icon: 'fas fa-fire',
    title: 'Haldi & Engagement Shoots',
    tag: 'Fan Favourite',
    tagColor: 'maroon',
    desc: 'Vibrant, colourful and full of life — we capture every splash, laugh, and tender moment of your pre-wedding functions with energy and creativity.',
    features: [
      '1 Senior Photographer',
      '4–6 Hour Coverage',
      '200+ Edited Photos',
      'Candid & Posed Shots',
      'Same-Day Sneak Peek',
      'Online Gallery Delivery',
    ],
    highlight: 'Starting ₹15,000',
  },
  {
    id: 'baby',
    icon: 'fas fa-baby',
    title: 'Baby & Kids Photography',
    tag: null,
    tagColor: null,
    desc: 'Tiny fingers, big smiles, and pure joy. We create a safe and fun environment to capture your little one\'s best moments in the most natural and loving way.',
    features: [
      'Studio or Home Setup',
      '2–3 Hour Session',
      '100+ Edited Photos',
      'Props Included',
      'Theme Customisation',
      'Print-Ready Files',
    ],
    highlight: 'Starting ₹8,000',
  },
  {
    id: 'maternity',
    icon: 'fas fa-heart',
    title: 'Maternity Shoots',
    desc: 'Celebrating the most beautiful journey of your life. Elegant, emotional and timeless portraits for this magical phase — whether outdoors, at home, or in studio.',
    tag: null,
    tagColor: null,
    features: [
      'Outdoor or Studio',
      '2–4 Hour Session',
      '150+ Edited Photos',
      '2 Outfit Changes',
      'Partner Included',
      'Premium Editing',
    ],
    highlight: 'Starting ₹10,000',
  },
  {
    id: 'birthday',
    icon: 'fas fa-birthday-cake',
    title: 'Birthday Celebrations',
    tag: null,
    tagColor: null,
    desc: 'From 1st birthdays to milestone celebrations — every laugh, cake smash, and heartfelt moment beautifully preserved for your family to treasure forever.',
    features: [
      '1 Senior Photographer',
      '3–5 Hour Coverage',
      '200+ Edited Photos',
      'Candid Moments',
      'Group Shots Included',
      'Quick Delivery',
    ],
    highlight: 'Starting ₹12,000',
  },
  {
    id: 'family',
    icon: 'fas fa-users',
    title: 'Family Events & Functions',
    tag: null,
    tagColor: null,
    desc: 'Traditional functions, family gatherings, and cultural events covered with warmth, detail, and genuine storytelling that honours every tradition.',
    features: [
      '1–2 Photographers',
      'Flexible Coverage Hours',
      '300+ Edited Photos',
      'Traditional & Candid',
      'All Functions Covered',
      'Pan India Travel',
    ],
    highlight: 'Starting ₹18,000',
  },
];

const process = [
  {
    step: '01',
    icon: 'fas fa-comments',
    title: 'Free Consultation',
    desc: 'Reach out via WhatsApp or the form. We schedule a free call to understand your vision, venue, and requirements.',
  },
  {
    step: '02',
    icon: 'fas fa-calendar-check',
    title: 'Booking & Planning',
    desc: 'We lock your date with a 30% advance. A dedicated coordinator guides you through planning, shot lists, and timelines.',
  },
  {
    step: '03',
    icon: 'fas fa-camera',
    title: 'The Event Day',
    desc: 'Our team arrives early, blends into your celebration, and captures every moment with precision and heart.',
  },
  {
    step: '04',
    icon: 'fas fa-images',
    title: 'Editing & Delivery',
    desc: 'Preview photos in 48 hours. Full edited gallery in 30 days. Cinematic film in 60–75 days.',
  },
];

function Services() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
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
        <div className="services-hero__lines">
          <span /><span /><span />
        </div>
        <div className="services-hero__content">
          <span className="section-tag">✦ What We Offer</span>
          <h1 className="services-hero__title">
            Every Moment Deserves
            <em> to Be Remembered</em>
          </h1>
          <p className="services-hero__sub">
            Mumbai · Pan India · International
          </p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="services-section">
        <div className="services-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Our Services"
              titleHtml="Capturing Every <em>Chapter of Your Life</em>"
              center
            />
          </div>

          <div className="services__grid">
            {services.map((s, i) => (
              <div
                className="service__card reveal"
                key={s.id}
                style={{ transitionDelay: `${i * 0.09}s` }}
                ref={addRef}
              >
                {/* Tag */}
                {s.tag && (
                  <span className={`service__tag service__tag--${s.tagColor}`}>
                    {s.tag}
                  </span>
                )}

                {/* Top */}
                <div className="service__top">
                  <div className="service__icon">
                    <i className={s.icon} />
                  </div>
                  <span className="service__highlight">{s.highlight}</span>
                </div>

                <h3 className="service__title">{s.title}</h3>
                <p className="service__desc">{s.desc}</p>

                {/* Features */}
                <ul className="service__features">
                  {s.features.map(f => (
                    <li key={f}>
                      <i className="fas fa-check" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/book-now" className="service__cta">
                  Enquire Now
                  <i className="fas fa-arrow-right" />
                </Link>

                {/* Hover line */}
                <div className="service__line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
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
                style={{ transitionDelay: `${i * 0.12}s` }}
                ref={addRef}
              >
                <div className="process__icon-wrap">
                  <i className={p.icon} />
                </div>
                <span className="process__step">{p.step}</span>
                <h3 className="process__title">{p.title}</h3>
                <p className="process__desc">{p.desc}</p>
                {i < process.length - 1 && (
                  <div className="process__connector">
                    <i className="fas fa-chevron-right" />
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
          <span className="section-tag">✦ Ready to Begin?</span>
          <h2 className="services-cta__title">
            Let's Create Something <em>Unforgettable Together</em>
          </h2>
          <p className="services-cta__sub">
            Dates fill up fast. Reach out today and let's start planning
            your perfect coverage.
          </p>
          <div className="services-cta__btns">
            <Link to="/book-now" className="btn-primary">
              Book a Session
              <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/packages" className="btn-outline">
              View Packages
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Services;