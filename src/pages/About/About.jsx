import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './About.css';

const stats = [
  { num: '500+', label: 'Events Covered' },
  { num: '5+',   label: 'Years Experience' },
  { num: '20+',  label: 'Cities Covered' },
  { num: '4.9★', label: 'Client Rating' },
];

const specialisations = [
  'Wedding Photography & Films',
  'Haldi & Engagement Shoots',
  'Baby & Kids Photography',
  'Maternity Shoots',
  'Birthday Celebrations',
  'Family Events & Traditional Functions',
];

const milestones = [
  {
    year: '2019',
    event: 'Started with a single camera and a passion for storytelling in Borivali, Mumbai.',
  },
  {
    year: '2020',
    event: 'Expanded into maternity and baby photography. First 100 events completed.',
  },
  {
    year: '2021',
    event: 'Launched cinematic wedding films. Covered first destination wedding.',
  },
  {
    year: '2023',
    event: 'Crossed 20+ cities. Became one of Mumbai\'s most trusted photography studios.',
  },
  {
    year: '2024',
    event: '500+ events. 4.9★ rating. Clients across India and international destinations.',
  },
];

const values = [
  {
    icon: 'fas fa-heart',
    title: 'Emotion First',
    desc: 'Every frame we shoot is driven by the feeling in the room, not a shot list.',
  },
  {
    icon: 'fas fa-eye',
    title: 'Natural Light',
    desc: 'We work with available light to create images that feel real, warm, and timeless.',
  },
  {
    icon: 'fas fa-comments',
    title: 'Comfort & Trust',
    desc: 'We invest time getting to know you so the camera never feels intrusive.',
  },
  {
    icon: 'fas fa-film',
    title: 'Cinematic Quality',
    desc: 'Every delivery — photos or films — is crafted to premium visual standards.',
  },
];

function About() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
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
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__lines">
          <span /><span /><span />
        </div>
        <div className="about-hero__content">
          <span className="section-tag">✦ Our Story</span>
          <h1 className="about-hero__title">
            More Than a Photographer —<br />
            <em>A Visual Storyteller</em>
          </h1>
          <p className="about-hero__sub">
            Based in Mumbai · Serving India & Beyond
          </p>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="about-story">
        <div className="about-story__inner">

          {/* Left text */}
          <div className="about-story__text reveal" ref={addRef}>
            <SectionHeader
              tag="✦ About Akshay"
              titleHtml="Photographs Should Make You <em>Feel Again</em>"
            />
            <p>
              At <strong>Akshay Thombare Photography</strong>, we believe
              photographs should make you feel the moment again — not just
              remember it. We specialise in capturing real emotions, genuine
              smiles, and timeless memories with a cinematic and creative touch.
            </p>
            <p>
              From intimate family celebrations to grand weddings, every event
              is documented with attention to detail, storytelling, and premium
              visual quality. Our goal is simple — to create photographs and
              films that look natural, emotional, and unforgettable even years
              later.
            </p>
            <p>
              Based in <strong>Mumbai</strong>, we proudly serve clients across
              Borivali, Dahisar, and surrounding areas — and travel across
              India for destination events.
            </p>

            {/* Tagline */}
            <div className="about-story__tagline">
              <i className="fas fa-quote-left" />
              <p>Because moments fade. Memories shouldn't.</p>
            </div>

            <Link
              to="/book-now"
              className="btn-primary"
              style={{ marginTop: '8px', display: 'inline-flex' }}
            >
              Book a Session
              <i className="fas fa-arrow-right" />
            </Link>
          </div>

          {/* Right — stats + specialisations */}
          <div className="about-story__right reveal" ref={addRef}>

            {/* Stats grid */}
            <div className="about-stats">
              {stats.map(s => (
                <div className="about-stat" key={s.label}>
                  <span className="about-stat__num">{s.num}</span>
                  <span className="about-stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Specialisations list */}
            <div className="about-specs">
              <p className="about-specs__label">We specialise in</p>
              <ul className="about-specs__list">
                {specialisations.map(s => (
                  <li key={s}>
                    <i className="fas fa-check" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="about-values">
        <div className="about-values__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Our Philosophy"
              titleHtml="What Drives Every <em>Frame We Shoot</em>"
              center
              light
            />
          </div>
          <div className="values__grid">
            {values.map((v, i) => (
              <div
                className="values__card reveal"
                key={v.title}
                style={{ transitionDelay: `${i * 0.12}s` }}
                ref={addRef}
              >
                <div className="values__icon">
                  <i className={v.icon} />
                </div>
                <h3 className="values__title">{v.title}</h3>
                <p className="values__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="about-timeline">
        <div className="about-timeline__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Our Journey"
              titleHtml="5 Years of <em>Stories Told</em>"
              center
            />
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div
                className={`timeline__item reveal
                  ${i % 2 === 0
                    ? 'timeline__item--left'
                    : 'timeline__item--right'
                  }`}
                key={m.year}
                style={{ transitionDelay: `${i * 0.1}s` }}
                ref={addRef}
              >
                <div className="timeline__card">
                  <span className="timeline__year">{m.year}</span>
                  <p className="timeline__event">{m.event}</p>
                </div>
                <div className="timeline__dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <div className="about-cta__inner reveal" ref={addRef}>
          <span className="section-tag">✦ Let's Create Together</span>
          <h2 className="about-cta__title">
            Ready to Preserve Your <em>Most Precious Moments?</em>
          </h2>
          <p className="about-cta__sub">
            Whether it's a grand wedding or an intimate family celebration,
            we'd love to be part of your story.
          </p>
          <div className="about-cta__btns">
            <Link to="/book-now" className="btn-primary">
              Book a Session
              <i className="fas fa-arrow-right" />
            </Link>
            <Link to="/gallery" className="btn-outline">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;