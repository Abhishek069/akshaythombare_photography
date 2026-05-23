import React, { useEffect, useRef } from 'react';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import './WhyChooseUs.css';

const specialisations = [
  {
    icon: 'fas fa-ring',
    title: 'Wedding Photography & Films',
    desc: 'Full-day cinematic coverage of your wedding — every ritual, emotion, and celebration documented with precision and heart.',
    delay: 0,
  },
  {
    icon: 'fas fa-fire',
    title: 'Haldi & Engagement Shoots',
    desc: 'Vibrant, colourful, and full of life — we capture every splash, laugh, and tender moment of your pre-wedding functions.',
    delay: 0.1,
  },
  {
    icon: 'fas fa-baby',
    title: 'Baby & Kids Photography',
    desc: 'Tiny fingers, big smiles, and pure joy. We create a safe and fun environment to capture your little one\'s best moments.',
    delay: 0.2,
  },
  {
    icon: 'fas fa-heart',
    title: 'Maternity Shoots',
    desc: 'Celebrating the most beautiful journey of your life. Elegant, emotional, and timeless portraits for this magical phase.',
    delay: 0.3,
  },
  {
    icon: 'fas fa-birthday-cake',
    title: 'Birthday Celebrations',
    desc: 'From 1st birthdays to milestone celebrations — every laugh, cake smash, and heartfelt moment beautifully preserved.',
    delay: 0.4,
  },
  {
    icon: 'fas fa-users',
    title: 'Family Events & Functions',
    desc: 'Traditional functions, family gatherings, and cultural events covered with warmth, detail, and genuine storytelling.',
    delay: 0.5,
  },
];

const whyUs = [
  { icon: 'fas fa-eye',         text: 'Real emotions, not posed pictures' },
  { icon: 'fas fa-film',        text: 'Cinematic storytelling approach' },
  { icon: 'fas fa-clock',       text: '48hr preview delivery' },
  { icon: 'fas fa-map-marker-alt', text: 'Pan India coverage' },
];

function WhyChooseUs() {
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
    <section className="why">
      <div className="why__inner">

        {/* ── Header ── */}
        <div className="reveal" ref={addRef}>
          <SectionHeader
            tag="✦ What We Do"
            titleHtml="Specialising in Every <em>Chapter of Life</em>"
            center
          />
        </div>

        {/* ── Specialisations grid ── */}
        <div className="why__grid">
          {specialisations.map((s, i) => (
            <div
              className="why__card reveal"
              key={s.title}
              style={{ transitionDelay: `${s.delay}s` }}
              ref={addRef}
            >
              {/* Number */}
              <span className="why__card-num">
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="why__icon">
                <i className={s.icon} />
              </div>

              <h3 className="why__card-title">{s.title}</h3>
              <p className="why__card-desc">{s.desc}</p>

              {/* Hover line */}
              <div className="why__card-line" />
            </div>
          ))}
        </div>

        {/* ── Why us strip ── */}
        <div className="why__strip reveal" ref={addRef}>
          <p className="why__strip-label">Why choose us —</p>
          <div className="why__strip-items">
            {whyUs.map(w => (
              <div className="why__strip-item" key={w.text}>
                <i className={w.icon} />
                <span>{w.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;