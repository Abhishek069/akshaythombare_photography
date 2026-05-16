import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './Packages.css';

const packages = [
  {
    name: 'Silver',
    price: '55,000',
    tag: null,
    tagline: 'Perfect for intimate weddings',
    color: 'silver',
    features: [
      { text: '1 Senior Photographer',         included: true },
      { text: '8 Hours Coverage',               included: true },
      { text: '300+ Edited Photos',             included: true },
      { text: 'Online Gallery Delivery',        included: true },
      { text: 'Candid Photography',             included: true },
      { text: 'Videography',                    included: false },
      { text: 'Drone Coverage',                 included: false },
      { text: 'Pre-Wedding Shoot',              included: false },
      { text: 'Premium Album',                  included: false },
      { text: 'Same-Day Edit (Highlights)',     included: false },
    ],
  },
  {
    name: 'Gold',
    price: '1,10,000',
    tag: 'Most Popular',
    tagline: 'Our best-selling complete package',
    color: 'gold',
    features: [
      { text: '2 Senior Photographers',         included: true },
      { text: 'Full Day Coverage',              included: true },
      { text: '600+ Edited Photos',             included: true },
      { text: 'Online Gallery Delivery',        included: true },
      { text: 'Candid Photography',             included: true },
      { text: 'Cinematic Highlight Film',       included: true },
      { text: 'Drone Coverage',                 included: true },
      { text: 'Pre-Wedding Shoot',              included: false },
      { text: 'Premium Album',                  included: false },
      { text: 'Same-Day Edit (Highlights)',     included: false },
    ],
  },
  {
    name: 'Platinum',
    price: '2,20,000',
    tag: 'Premium',
    tagline: 'The ultimate luxury experience',
    color: 'platinum',
    features: [
      { text: '3 Senior Photographers',         included: true },
      { text: 'Multi-Day Full Coverage',        included: true },
      { text: '1000+ Edited Photos',            included: true },
      { text: 'Online Gallery Delivery',        included: true },
      { text: 'Candid Photography',             included: true },
      { text: 'Full Cinematic Film + Teaser',   included: true },
      { text: 'Drone Coverage',                 included: true },
      { text: 'Pre-Wedding Shoot Included',     included: true },
      { text: 'Luxury Leather Album',           included: true },
      { text: 'Same-Day Edit (Highlights)',     included: true },
    ],
  },
];

const addons = [
  { icon: 'fas fa-drone',        title: 'Drone Add-On',          price: '₹15,000',  desc: 'Aerial footage of venue, baraat & celebrations.' },
  { icon: 'fas fa-book-open',    title: 'Premium Album',         price: '₹18,000',  desc: '30-page fine art album with leather cover.' },
  { icon: 'fas fa-heart',        title: 'Pre-Wedding Shoot',     price: '₹20,000',  desc: '4-hour shoot at location of your choice.' },
  { icon: 'fas fa-film',         title: 'Same-Day Edit',         price: '₹12,000',  desc: '3-min highlight reel screened at reception.' },
  { icon: 'fas fa-globe',        title: 'Destination Travel',    price: 'Custom',   desc: 'Pan India & international — ask for a quote.' },
  { icon: 'fas fa-photo-video',  title: 'Extra Photographer',    price: '₹8,000/day', desc: 'Add a second or third shooter to any package.' },
];

const faqs = [
  {
    q: 'How do I confirm my booking?',
    a: 'A 30% advance payment via UPI, bank transfer, or card confirms your date. We send a formal agreement within 24 hours of booking.',
  },
  {
    q: 'When will we receive our photos and films?',
    a: 'Preview images are delivered within 48 hours. Fully edited photos in 30–45 days. Cinematic films in 60–75 days. Albums within 90 days of photo selection.',
  },
  {
    q: 'Can we customise a package?',
    a: 'Yes! Our packages are a starting guide. We create fully customised quotes based on wedding duration, number of functions, city, and your specific needs.',
  },
  {
    q: 'What is your payment policy?',
    a: '30% advance to confirm. 40% one month before the wedding. 30% on the wedding day. We accept UPI, bank transfer, and cards.',
  },
  {
    q: 'Do you cover multi-day weddings and all functions?',
    a: 'Absolutely. We cover Haldi, Mehndi, Sangeet, Engagement, Wedding Day, and Reception. Multi-function discounts available on request.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button className="faq__question" onClick={() => setOpen(o => !o)}>
        {q}
        <i className={`fas ${open ? 'fa-minus' : 'fa-plus'}`} />
      </button>
      <div className="faq__answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

function Packages() {
  const [billing, setBilling] = useState('per-function'); // 'per-function' | 'full-wedding'
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
      <section className="packages-hero">
        <div className="packages-hero__overlay" />
        <div className="packages-hero__content">
          <span className="section-tag">✦ Pricing</span>
          <h1 className="packages-hero__title">
            Transparent Packages, <em>No Hidden Costs</em>
          </h1>
        </div>
      </section>

      {/* ── Packages Section ── */}
      <section className="packages-section">
        <div className="packages-section__inner">

          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Our Packages"
              titleHtml="Choose the Perfect <em>Coverage for You</em>"
              center
            />
          </div>

          {/* Toggle */}
          <div className="packages__toggle reveal" ref={addRef}>
            <button
              className={billing === 'per-function' ? 'active' : ''}
              onClick={() => setBilling('per-function')}
            >
              Per Function
            </button>
            <button
              className={billing === 'full-wedding' ? 'active' : ''}
              onClick={() => setBilling('full-wedding')}
            >
              Full Wedding
            </button>
          </div>

          {billing === 'full-wedding' && (
            <p className="packages__toggle-note reveal" ref={addRef}>
              ✦ Full wedding packages include all functions at a discounted bundled rate.
              <Link to="/book-now"> Contact us for a custom quote.</Link>
            </p>
          )}

          {/* Cards */}
          <div className="packages__grid">
            {packages.map((pkg, i) => (
              <div
                className={`package__card package__card--${pkg.color} reveal`}
                key={pkg.name}
                style={{ transitionDelay: `${i * 0.12}s` }}
                ref={addRef}
              >
                {pkg.tag && (
                  <div className="package__tag">{pkg.tag}</div>
                )}

                <div className="package__header">
                  <span className="package__name">{pkg.name}</span>
                  <span className="package__tagline">{pkg.tagline}</span>
                  <div className="package__price">
                    <span className="package__currency">₹</span>
                    <span className="package__amount">{pkg.price}</span>
                    <span className="package__per">/ function</span>
                  </div>
                </div>

                <ul className="package__features">
                  {pkg.features.map(f => (
                    <li
                      key={f.text}
                      className={f.included ? 'included' : 'excluded'}
                    >
                      <i className={`fas ${f.included ? 'fa-check' : 'fa-times'}`} />
                      {f.text}
                    </li>
                  ))}
                </ul>

                <Link to="/book-now" className="package__cta">
                  Book {pkg.name} Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add-Ons ── */}
      <section className="addons-section">
        <div className="addons-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Customise Further"
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

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-section__inner">
          <div className="reveal" ref={addRef}>
            <SectionHeader
              tag="✦ FAQs"
              titleHtml="Questions We <em>Always Get Asked</em>"
              center
            />
          </div>

          <div className="faq__list">
            {faqs.map(f => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="packages-cta">
        <div className="packages-cta__inner reveal" ref={addRef}>
          <span className="section-tag">✦ Ready to Book?</span>
          <h2 className="packages-cta__title">
            Can't Find the Right Fit? <em>Let's Build Yours.</em>
          </h2>
          <p className="packages-cta__sub">
            Every wedding is different. WhatsApp us and we'll design a
            custom package around your exact needs and budget.
          </p>
          <div className="packages-cta__btns">
            <Link to="/book-now" className="btn-primary">Get a Custom Quote</Link>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
              className="btn-wa"
            >
              <i className="fab fa-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Packages;