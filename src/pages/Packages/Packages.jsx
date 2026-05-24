import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Packages.css';

const packages = [
  {
    name: 'Essential',
    price: '7,500',
    tag: null,
    tagline: 'Perfect for small celebrations',
    color: 'essential',
    icon: 'fas fa-seedling',
    features: [
      { text: '1 Senior Photographer',          included: true  },
      { text: '4 Hours Coverage',               included: true  },
      { text: '150+ Edited Photos',             included: true  },
      { text: 'Online Gallery Delivery',        included: true  },
      { text: 'Candid Photography',             included: true  },
      { text: 'Videography',                    included: false },
      { text: 'Drone Coverage',                 included: false },
      { text: 'Pre-Event Shoot',                included: false },
      { text: 'Premium Album',                  included: false },
      { text: 'Same-Day Highlights',            included: false },
    ],
  },
  {
    name: 'Premium',
    price: '17,500',
    tag: 'Most Popular',
    tagline: 'Our best-selling complete package',
    color: 'premium',
    icon: 'fas fa-star',
    features: [
      { text: '2 Senior Photographers',         included: true  },
      { text: 'Full Day Coverage',              included: true  },
      { text: '400+ Edited Photos',             included: true  },
      { text: 'Online Gallery Delivery',        included: true  },
      { text: 'Candid Photography',             included: true  },
      { text: 'Cinematic Highlight Film',       included: true  },
      { text: 'Drone Coverage',                 included: true  },
      { text: 'Pre-Event Shoot',                included: false },
      { text: 'Premium Album',                  included: false },
      { text: 'Same-Day Highlights',            included: false },
    ],
  },
  {
    name: 'Signature',
    price: '32,500',
    tag: 'All Inclusive',
    tagline: 'The ultimate luxury experience',
    color: 'signature',
    icon: 'fas fa-crown',
    features: [
      { text: '3 Senior Photographers',         included: true  },
      { text: 'Multi-Day Full Coverage',        included: true  },
      { text: '800+ Edited Photos',             included: true  },
      { text: 'Online Gallery Delivery',        included: true  },
      { text: 'Candid Photography',             included: true  },
      { text: 'Full Cinematic Film + Teaser',   included: true  },
      { text: 'Drone Coverage',                 included: true  },
      { text: 'Pre-Event Shoot Included',       included: true  },
      { text: 'Luxury Leather Album',           included: true  },
      { text: 'Same-Day Highlights',            included: true  },
    ],
  },
];

const addons = [
  {
    icon: 'fas fa-drone',
    title: 'Drone Add-On',
    price: 'â‚¹4,000',
    desc: 'Aerial footage of venue and celebrations.',
  },
  {
    icon: 'fas fa-book-open',
    title: 'Premium Album',
    price: 'â‚¹6,000',
    desc: '30-page fine art album with leather cover.',
  },
  {
    icon: 'fas fa-heart',
    title: 'Pre-Event Shoot',
    price: 'â‚¹5,000',
    desc: '3-hour shoot at location of your choice.',
  },
  {
    icon: 'fas fa-film',
    title: 'Same-Day Edit',
    price: 'â‚¹4,000',
    desc: '3-min highlight reel ready same day.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Destination Travel',
    price: 'Custom',
    desc: 'Pan India & international â€” ask for quote.',
  },
  {
    icon: 'fas fa-user-plus',
    title: 'Extra Photographer',
    price: 'â‚¹2,500/day',
    desc: 'Add a second or third shooter to any package.',
  },
];

const faqs = [
  {
    q: 'How do I confirm my booking?',
    a: 'A 30% advance payment confirms your date. We send a formal booking confirmation within 24 hours. Balance is split â€” 40% one month before the event and 30% on the day itself.',
  },
  {
    q: 'When will we receive our photos and films?',
    a: 'Preview sneak-peek images are delivered within 48 hours. Fully edited gallery in 30â€“45 days. Cinematic films in 60â€“75 days. Albums within 90 days of photo selection.',
  },
  {
    q: 'Can we customise a package?',
    a: 'Absolutely! Our packages are a starting point. We build fully custom quotes based on your event type, duration, functions, city, and specific needs.',
  },
  {
    q: 'Do you cover multiple functions like Haldi, Mehndi, Sangeet?',
    a: 'Yes! We cover all pre-wedding and wedding functions. Multi-function discounts are available â€” reach out for a bundled quote.',
  },
  {
    q: 'Do you travel outside Mumbai?',
    a: 'Yes â€” we cover Pan India and international destinations. Travel and accommodation costs are added to the package at actuals.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Advance payments are non-refundable but fully transferable to a rescheduled date. We are flexible and work with couples in every situation.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button
        className="faq__question"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <div className="faq__icon">
          <i className={`fas ${open ? 'fa-minus' : 'fa-plus'}`} />
        </div>
      </button>
      <div
        className="faq__answer"
        style={{ maxHeight: open ? '300px' : '0' }}
      >
        <p>{a}</p>
      </div>
    </div>
  );
}

function Packages() {
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
    if (el && !revealRefs.current.includes(el))
      revealRefs.current.push(el);
  };

  return (
    <main className="page-wrapper">

      {/* â”€â”€ Page Hero â”€â”€ */}
      <section className="packages-hero">
        <div className="packages-hero__overlay" />
        <div className="packages-hero__lines">
          <span /><span /><span />
        </div>
        <div className="packages-hero__content">
          <span className="section-tag">âœ¦ Investment</span>
          <h1 className="packages-hero__title">
            Transparent Pricing,
            <em> No Hidden Costs</em>
          </h1>
          <p className="packages-hero__sub">
            Mumbai Â· Pan India Â· International
          </p>
        </div>
      </section>

      {/* â”€â”€ Packages Section â”€â”€ */}
      <section className="packages-section">
        <div className="packages-section__inner">

          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="âœ¦ Our Packages"
              titleHtml="Choose the Coverage That <em>Fits Your Story</em>"
              center
            />
          </div>

          {/* Cards */}
          <div className="packages__grid">
            {packages.map((pkg, i) => (
              <div
                className={`package__card package__card--${pkg.color} reveal`}
                key={pkg.name}
                style={{ transitionDelay: `${i * 0.12}s` }}
                ref={addRef}
              >
                {/* Tag */}
                {pkg.tag && (
                  <div className="package__tag">{pkg.tag}</div>
                )}

                {/* Header */}
                <div className="package__header">
                  <div className="package__icon">
                    <i className={pkg.icon} />
                  </div>
                  <span className="package__name">{pkg.name}</span>
                  <span className="package__tagline">{pkg.tagline}</span>
                  <div className="package__price">
                    <span className="package__currency">â‚¹</span>
                    <span className="package__amount">{pkg.price}</span>
                  </div>
                  <span className="package__per">onwards</span>
                </div>

                {/* Features */}
                <ul className="package__features">
                  {pkg.features.map(f => (
                    <li
                      key={f.text}
                      className={f.included ? 'included' : 'excluded'}
                    >
                      <i className={
                        `fas ${f.included ? 'fa-check' : 'fa-times'}`
                      } />
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link to="/book-now" className="package__cta">
                  Book {pkg.name}
                  <i className="fas fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="packages__note reveal" ref={addRef}>
            <i className="fas fa-info-circle" />
            All packages are fully customisable. Prices vary based on
            event type, duration, and location.
            <Link to="/book-now"> Get a custom quote â†’</Link>
          </p>

        </div>
      </section>

      {/* â”€â”€ Add-Ons â”€â”€ */}
      <section className="addons-section">
        <div className="addons-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="âœ¦ Enhance Your Package"
              titleHtml="Popular <em>Add-Ons</em>"
              center
              light
            />
          </div>

          <div className="addons__grid">
            {addons.map((a, i) => (
              <div
                className="addon__card reveal"
                key={a.title}
                style={{ transitionDelay: `${i * 0.08}s` }}
                ref={addRef}
              >
                <div className="addon__icon">
                  <i className={a.icon} />
                </div>
                <div className="addon__body">
                  <div className="addon__top">
                    <h3 className="addon__title">{a.title}</h3>
                    <span className="addon__price">{a.price}</span>
                  </div>
                  <p className="addon__desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FAQ â”€â”€ */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="âœ¦ FAQs"
              titleHtml="Questions We <em>Always Get Asked</em>"
              center
            />
          </div>

          <div className="faq__list">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="reveal"
                style={{ transitionDelay: `${i * 0.07}s` }}
                ref={addRef}
              >
                <FaqItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="packages-cta">
        <div className="packages-cta__inner reveal" ref={addRef}>
          <span className="section-tag">âœ¦ Let's Talk</span>
          <h2 className="packages-cta__title">
            Can't Find the Right Fit?
            <em> Let's Build Yours.</em>
          </h2>
          <p className="packages-cta__sub">
            Every event is different. WhatsApp us and we'll design
            a custom package around your exact needs and budget.
          </p>
          <div className="packages-cta__btns">
            <Link to="/book-now" className="btn-primary">
              Get a Custom Quote
              <i className="fas fa-arrow-right" />
            </Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="btn-wa"
            >
              <i className="fab fa-whatsapp" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Packages;