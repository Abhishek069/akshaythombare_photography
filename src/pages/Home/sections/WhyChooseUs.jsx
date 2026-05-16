import React, { useEffect, useRef } from 'react';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import './WhyChooseUs.css';

const reasons = [
  {
    icon: 'fas fa-camera',
    title: 'Candid Specialists',
    desc: 'We master the art of capturing unposed, real emotions — the tears, the laughter, the stolen glances.',
  },
  {
    icon: 'fas fa-film',
    title: 'Cinematic Films',
    desc: 'Award-winning videography that turns your wedding day into a movie you will rewatch forever.',
  },
  {
    icon: 'fas fa-map-marked-alt',
    title: 'Pan India Coverage',
    desc: 'From grand Delhi banquets to intimate Goa beach weddings — we travel wherever your love story unfolds.',
  },
  {
    icon: 'fas fa-palette',
    title: 'Premium Editing',
    desc: 'Every photo is hand-edited by our senior artists, delivering a timeless, magazine-worthy finish.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Dedicated Support',
    desc: 'A personal coordinator assigned to your wedding from booking to album delivery.',
  },
  {
    icon: 'fas fa-clock',
    title: 'On-Time Delivery',
    desc: 'Preview photos within 48 hours. Full gallery in 30 days. We respect your excitement.',
  },
];

function WhyChooseUs() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    cardsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why">
      <div className="why__inner">
        <div className="reveal" ref={el => (cardsRef.current[0] = el)}>
          <SectionHeader
            tag="✦ Why Choose Us"
            titleHtml="What Makes Us <em>Different</em>"
            center
          />
        </div>

        <div className="why__grid">
          {reasons.map((r, i) => (
            <div
              className="why__card reveal"
              key={r.title}
              style={{ transitionDelay: `${i * 0.1}s` }}
              ref={el => (cardsRef.current[i + 1] = el)}
            >
              <div className="why__icon">
                <i className={r.icon} />
              </div>
              <h3 className="why__card-title">{r.title}</h3>
              <p className="why__card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;