import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './BookNow.css';

const WHATSAPP_NUMBER = '919999999999';

const initialForm = {
  name:     '',
  phone:    '',
  email:    '',
  date:     '',
  city:     '',
  package:  '',
  functions: [],
  message:  '',
};

const functionOptions = [
  'Haldi', 'Mehndi', 'Sangeet', 'Engagement',
  'Wedding Day', 'Reception', 'Pre-Wedding Shoot',
];

const packageOptions = [
  'Silver (₹55,000)',
  'Gold (₹1,10,000)',
  'Platinum (₹2,20,000)',
  'Custom Package',
];

const contactInfo = [
  { icon: 'fas fa-phone',          label: 'Phone / WhatsApp', value: '+91 99999 99999' },
  { icon: 'fas fa-envelope',       label: 'Email',            value: 'hello@Akshaythombare Photography.com' },
  { icon: 'fas fa-map-marker-alt', label: 'Studio',           value: '42, Studio Lane, Lajpat Nagar, New Delhi – 110024' },
  { icon: 'fas fa-clock',          label: 'Hours',            value: 'Mon – Sat: 10 AM – 7 PM' },
];

function BookNow() {
  const [form,    setForm]    = useState(initialForm);
  const [errors,  setErrors]  = useState({});
  const [submitted, setSubmitted] = useState(false);
  const revealRefs = useRef([]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  // Field change handler
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Multi-select functions checkboxes
  const toggleFunction = fn => {
    setForm(prev => ({
      ...prev,
      functions: prev.functions.includes(fn)
        ? prev.functions.filter(f => f !== fn)
        : [...prev.functions, fn],
    }));
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Please enter your name.';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.date)         e.date  = 'Please select your wedding date.';
    return e;
  };

  // Send via WhatsApp
  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const msg = [
      `Hi AkshayThombare Photography! 🙏`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email    ? `*Email:* ${form.email}`                       : null,
      `*Wedding Date:* ${form.date}`,
      form.city     ? `*City:* ${form.city}`                         : null,
      form.package  ? `*Package:* ${form.package}`                   : null,
      form.functions.length ? `*Functions:* ${form.functions.join(', ')}` : null,
      form.message  ? `*Message:* ${form.message}`                   : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <main className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="booknow-hero">
        <div className="booknow-hero__overlay" />
        <div className="booknow-hero__content">
          <span className="section-tag">✦ Get In Touch</span>
          <h1 className="booknow-hero__title">
            Let's Plan Your <em>Perfect Day</em>
          </h1>
        </div>
      </section>

      {/* ── Main Section ── */}
      <section className="booknow-section">
        <div className="booknow-section__inner">

          {/* Left — Contact Info */}
          <div className="booknow__info reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Reach Us"
              titleHtml="We'd Love to <em>Hear From You</em>"
            />

            <p className="booknow__info-intro">
              Whether you have a date in mind or are just exploring, we're
              here to answer every question. WhatsApp us anytime — we usually
              reply within 30 minutes!
            </p>

            <div className="booknow__contact-list">
              {contactInfo.map(c => (
                <div className="booknow__contact-item" key={c.label}>
                  <div className="booknow__contact-icon">
                    <i className={c.icon} />
                  </div>
                  <div className="booknow__contact-text">
                    <strong>{c.label}</strong>
                    <span>{c.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi AkshayThombare Photography! I'd like to enquire about wedding photography.")}`}
              target="_blank"
              rel="noreferrer"
              className="booknow__wa-btn"
            >
              <i className="fab fa-whatsapp" /> Chat With Us on WhatsApp
            </a>

            {/* Trust badges */}
            <div className="booknow__badges">
              {[
                { icon: 'fas fa-shield-alt',  text: '100% Secure Booking' },
                { icon: 'fas fa-undo',         text: 'Flexible Rescheduling' },
                { icon: 'fas fa-trophy',       text: 'Award Winning Team' },
              ].map(b => (
                <div className="booknow__badge" key={b.text}>
                  <i className={b.icon} />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="booknow__form reveal" ref={addRef}>

            {submitted && (
              <div className="booknow__success">
                <i className="fas fa-check-circle" />
                <div>
                  <strong>Message sent to WhatsApp!</strong>
                  <span>We'll get back to you within 30 minutes.</span>
                </div>
              </div>
            )}

            <div className="form__row">
              <div className="form__group">
                <label className="form__label">
                  Your Name <span className="form__required">*</span>
                </label>
                <input
                  className={`form__input ${errors.name ? 'form__input--error' : ''}`}
                  type="text"
                  name="name"
                  placeholder="Bride / Groom Name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="form__error">{errors.name}</span>}
              </div>

              <div className="form__group">
                <label className="form__label">
                  Phone Number <span className="form__required">*</span>
                </label>
                <input
                  className={`form__input ${errors.phone ? 'form__input--error' : ''}`}
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="form__error">{errors.phone}</span>}
              </div>
            </div>

            <div className="form__group">
              <label className="form__label">Email Address</label>
              <input
                className={`form__input ${errors.email ? 'form__input--error' : ''}`}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="form__error">{errors.email}</span>}
            </div>

            <div className="form__row">
              <div className="form__group">
                <label className="form__label">
                  Wedding Date <span className="form__required">*</span>
                </label>
                <input
                  className={`form__input ${errors.date ? 'form__input--error' : ''}`}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && <span className="form__error">{errors.date}</span>}
              </div>

              <div className="form__group">
                <label className="form__label">Wedding City</label>
                <input
                  className="form__input"
                  type="text"
                  name="city"
                  placeholder="Delhi, Mumbai, Jaipur..."
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form__group">
              <label className="form__label">Package Interested In</label>
              <select
                className="form__input form__select"
                name="package"
                value={form.package}
                onChange={handleChange}
              >
                <option value="">— Select a Package —</option>
                {packageOptions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Functions checkboxes */}
            <div className="form__group">
              <label className="form__label">Functions to Cover</label>
              <div className="form__checkboxes">
                {functionOptions.map(fn => (
                  <label key={fn} className="form__checkbox-label">
                    <input
                      type="checkbox"
                      checked={form.functions.includes(fn)}
                      onChange={() => toggleFunction(fn)}
                      className="form__checkbox"
                    />
                    <span className="form__checkbox-custom" />
                    {fn}
                  </label>
                ))}
              </div>
            </div>

            <div className="form__group">
              <label className="form__label">Tell Us About Your Wedding</label>
              <textarea
                className="form__input form__textarea"
                name="message"
                placeholder="Venue, number of guests, special requirements, any questions..."
                value={form.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <button className="booknow__submit" onClick={handleSubmit}>
              <i className="fas fa-paper-plane" />
              Send Enquiry via WhatsApp
            </button>

            <p className="booknow__form-note">
              <i className="fas fa-lock" /> Your details are safe with us. No spam, ever.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}

export default BookNow;