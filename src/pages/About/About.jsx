import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './About.css';

const team = [
  {
    name: 'Rahul Sharma',
    role: 'Lead Photographer & Founder',
    exp: '12+ Years',
    initial: 'R',
  },
  {
    name: 'Priya Kapoor',
    role: 'Senior Cinematographer',
    exp: '8+ Years',
    initial: 'P',
  },
  {
    name: 'Arjun Mehta',
    role: 'Candid Photography Expert',
    exp: '6+ Years',
    initial: 'A',
  },
  {
    name: 'Sneha Iyer',
    role: 'Album & Post-Production Lead',
    exp: '7+ Years',
    initial: 'S',
  },
];

const milestones = [
  { year: '2012', event: 'AkshayThombare Photography founded in Borivali with a single camera and a big dream.' },
  { year: '2015', event: 'Expanded to Mumbai & Andheri. Crossed 100 Events milestone.' },
  { year: '2018', event: 'Launched cinematic videography. Won Best Wedding Photographer — WPA India.' },
  { year: '2021', event: 'Went pan-India. Built a team of 15 specialists across photography & film.' },
  { year: '2024', event: 'Crossed 500 Events. Expanded to international destination weddings.' },
];

function About() {
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
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <span className="section-tag">✦ Our Story</span>
          <h1 className="about-hero__title">
            More Than Photographers —<br />
            <em>We Are Storytellers</em>
          </h1>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="about-story">
        <div className="about-story__inner">
          <div className="about-story__text reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Who We Are"
              titleHtml="Passion. Art. <em>Love.</em>"
            />
            <p>
              AkshayThombare Photography was born in 2012 from a simple belief — that every
              wedding deserves to be remembered exactly as it felt. Not just the
              grand moments, but the whispered vows, the grandmother's tearful
              smile, the stolen glances across a crowded mandap.
            </p>
            <p>
              Over a decade later, we've had the honour of documenting 500+
              love stories across India and beyond. Our team of 15+ artists
              blends technical excellence with genuine human connection — because
              great wedding photography isn't just about gear, it's about trust.
            </p>
            <p>
              Every couple we work with becomes part of our story. And we pour
              that same devotion into every frame we capture for them.
            </p>
            <Link to="/book-now" className="btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>
              Start Your Story
            </Link>
          </div>

          <div className="about-story__stats reveal" ref={addRef}>
            {[
              { num: '500+', label: 'Weddings Captured' },
              { num: '12+',  label: 'Years of Experience' },
              { num: '15+',  label: 'Team Members' },
              { num: '20+',  label: 'Awards Won' },
            ].map(s => (
              <div className="about-stat" key={s.label}>
                <span className="about-stat__num">{s.num}</span>
                <span className="about-stat__label">{s.label}</span>
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
              titleHtml="A Decade of <em>Love Stories</em>"
              center
            />
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div
                className={`timeline__item reveal ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
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

      {/* ── Team ── */}
      <section className="about-team">
        <div className="about-team__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ The Team"
              titleHtml="The Artists Behind <em>Your Frames</em>"
              center
            />
          </div>
          <div className="team__grid">
            {team.map((member, i) => (
              <div
                className="team__card reveal"
                key={member.name}
                style={{ transitionDelay: `${i * 0.1}s` }}
                ref={addRef}
              >
                <div className="team__avatar">{member.initial}</div>
                <h3 className="team__name">{member.name}</h3>
                <span className="team__role">{member.role}</span>
                <span className="team__exp">
                  <i className="fas fa-camera" /> {member.exp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="about-cta reveal" ref={addRef}>
        <div className="about-cta__inner">
          <span className="section-tag">✦ Ready to Begin?</span>
          <h2 className="about-cta__title">
            Let's Create Something <em>Beautiful Together</em>
          </h2>
          <div className="about-cta__btns">
            <Link to="/book-now" className="btn-primary">Book a Consultation</Link>
            <Link to="/gallery"  className="btn-outline">See Our Work</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;