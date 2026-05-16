import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import './Reviews.css';

const reviews = [
  {
    name: 'Priya & Arjun Sharma',
    location: 'Delhi',
    stars: 5,
    text: 'AkshayThombare Photography captured our wedding so beautifully. Every photo felt like a painting. We still cry watching our wedding film. Absolutely the best decision we made for our big day!',
    initial: 'P',
  },
  {
    name: 'Sneha & Rohan Mehta',
    location: 'Mumbai',
    stars: 5,
    text: 'From the pre-wedding shoot to the final album — every step was seamless. The team was professional, warm, and incredibly talented. Our photos are breathtaking!',
    initial: 'S',
  },
  {
    name: 'Ananya & Vikram Nair',
    location: 'Bangalore',
    stars: 5,
    text: `We were blown away by how they captured candid moments we didn't even know were happening. The cinematic reel made our entire family emotional. Highly recommended!`,
    initial: 'A',
  },
  {
    name: 'Pooja & Karan Gupta',
    location: 'Jaipur',
    stars: 5,
    text: 'The attention to detail is unmatched. They knew every corner of our venue better than us! Delivered the preview within 48 hours as promised. 10/10!',
    initial: 'P',
  },
  {
    name: 'Meera & Aditya Iyer',
    location: 'Chennai',
    stars: 5,
    text: 'A team that truly cares about your story. They spent time understanding our personalities before the shoot. The results were magical and completely authentic to us.',
    initial: 'M',
  },
];

function Stars({ count }) {
  return (
    <div className="review__stars">
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className="fas fa-star" />
      ))}
    </div>
  );
}

function Reviews() {
  const [active, setActive] = useState(0);
  const headerRef = useRef(null);

  // Auto-advance every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal for header
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const r = reviews[active];

  return (
    <section className="reviews">
      <div className="reviews__inner">
        <div className="reveal" ref={headerRef}>
          <SectionHeader
            tag="✦ Testimonials"
            titleHtml="Words From Our <em>Happy Couples</em>"
            center
            light
          />
        </div>

        <div className="reviews__card">
          <div className="reviews__quote">"</div>
          <p className="reviews__text">{r.text}</p>
          <Stars count={r.stars} />
          <div className="reviews__author">
            <div className="reviews__avatar">{r.initial}</div>
            <div>
              <strong className="reviews__name">{r.name}</strong>
              <span className="reviews__location">
                <i className="fas fa-map-marker-alt" /> {r.location}
              </span>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="reviews__dots">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`reviews__dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;