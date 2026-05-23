import React, { useState, useEffect, useRef } from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import './BookNow.css';

const WHATSAPP = '919999999999';

const initialForm = {
  name:      '',
  phone:     '',
  email:     '',
  date:      '',
  city:      '',
  eventType: '',
  package:   '',
  functions: [],
  message:   '',
};

const eventTypes = [
  'Wedding',
  'Haldi / Mehndi / Sangeet',
  'Engagement',
  'Baby & Kids Photography',
  'Maternity Shoot',
  'Birthday Celebration',
  'Family Event / Function',
  'Other',
];

const packageOptions = [
  'Essential (₹15,000 onwards)',
  'Premium (₹35,000 onwards)',
  'Signature (₹65,000 onwards)',
  'Custom Package',
];

const contactInfo = [
  {
    icon: 'fas fa-phone',
    label: 'Phone / WhatsApp',
    value: '+91 99999 99999',
    link: 'tel:+919999999999',
  },
  {
    icon: 'fas fa-envelope',
    label: 'Email',
    value: 'hello@akshay.photography',
    link: 'mailto:hello@akshay.photography',
  },
  {
    icon: 'fas fa-map-marker-alt',
    label: 'Based In',
    value: 'Borivali West, Mumbai — 400092',
    link: null,
  },
  {
    icon: 'fas fa-clock',
    label: 'Response Time',
    value: 'Within 30 minutes on WhatsApp',
    link: null,
  },
];

const badges = [
  { icon: 'fas fa-shield-alt',  text: 'Secure Booking' },
  { icon: 'fas fa-undo',         text: 'Flexible Reschedule' },
  { icon: 'fas fa-trophy',       text: 'Award Winning' },
  { icon: 'fas fa-star',         text: '4.9★ Rated' },
];

function BookNow() {
  const [form,      setForm]      = useState(initialForm);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = 'Please enter your name.';
    if (!form.phone.trim())
      e.phone = 'Please enter your phone number.';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email address.';
    if (!form.date)
      e.date = 'Please select your event date.';
    if (!form.eventType)
      e.eventType = 'Please select an event type.';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Scroll to first error
      const firstErr = document.querySelector('.form__input--error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSending(true);

    const msg = [
      `Hi Akshay! 🙏`,
      ``,
      `*Name:* ${form.name}`,
      `*Phone:* ${form.phone}`,
      form.email     ? `*Email:* ${form.email}`           : null,
      `*Event Date:* ${form.date}`,
      `*Event Type:* ${form.eventType}`,
      form.city      ? `*City:* ${form.city}`             : null,
      form.package   ? `*Package:* ${form.package}`       : null,
      form.message   ? `*Message:* ${form.message}`       : null,
    ]
      .filter(Boolean)
      .join('\n');

    setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
        '_blank'
      );
      setSending(false);
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <main className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="booknow-hero">
        <div className="booknow-hero__overlay" />
        <div className="booknow-hero__lines">
          <span /><span /><span />
        </div>
        <div className="booknow-hero__content">
          <span className="section-tag">✦ Let's Connect</span>
          <h1 className="booknow-hero__title">
            Let's Plan Your
            <em> Perfect Session</em>
          </h1>
          <p className="booknow-hero__sub">
            We reply within 30 minutes on WhatsApp
          </p>
        </div>
      </section>

      {/* ── Main Section ── */}
      <section className="booknow-section">
        <div className="booknow-section__inner">

          {/* ── Left — Info ── */}
          <div className="booknow__info reveal" ref={addRef}>
            <SectionHeader
              tag="✦ Get In Touch"
              titleHtml="We'd Love to Hear <em>From You</em>"
            />

            <p className="booknow__info-intro">
              Whether you have a date in mind or are just exploring,
              we're here to help. WhatsApp us anytime — we usually
              reply within 30 minutes!
            </p>

            {/* Contact list */}
            <div className="booknow__contact-list">
              {contactInfo.map(c => (
                <div className="booknow__contact-item" key={c.label}>
                  <div className="booknow__contact-icon">
                    <i className={c.icon} />
                  </div>
                  <div className="booknow__contact-text">
                    <strong>{c.label}</strong>
                    {c.link
                      ? <a href={c.link}>{c.value}</a>
                      : <span>{c.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                "Hi Akshay! I'd like to enquire about your photography services."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="booknow__wa-btn"
            >
              <i className="fab fa-whatsapp" />
              Chat With Us on WhatsApp
            </a>

            {/* Trust badges */}
            <div className="booknow__badges">
              {badges.map(b => (
                <div className="booknow__badge" key={b.text}>
                  <i className={b.icon} />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Form ── */}
          <div className="booknow__form reveal" ref={addRef}>

            {/* Success banner */}
            {submitted && (
              <div className="booknow__success">
                <div className="booknow__success-icon">
                  <i className="fas fa-check" />
                </div>
                <div>
                  <strong>Enquiry sent via WhatsApp!</strong>
                  <span>
                    We'll get back to you within 30 minutes.
                  </span>
                </div>
              </div>
            )}

            {/* Name + Phone */}
            <div className="form__row">
              <div className="form__group">
                <label className="form__label">
                  Your Name
                  <span className="form__required"> *</span>
                </label>
                <input
                  className={`form__input
                    ${errors.name ? 'form__input--error' : ''}
                  `}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="form__error">{errors.name}</span>
                )}
              </div>

              <div className="form__group">
                <label className="form__label">
                  Phone Number
                  <span className="form__required"> *</span>
                </label>
                <input
                  className={`form__input
                    ${errors.phone ? 'form__input--error' : ''}
                  `}
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="form__error">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form__group">
              <label className="form__label">Email Address</label>
              <input
                className={`form__input
                  ${errors.email ? 'form__input--error' : ''}
                `}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="form__error">{errors.email}</span>
              )}
            </div>

            {/* Date + City */}
            <div className="form__row">
              <div className="form__group">
                <label className="form__label">
                  Event Date
                  <span className="form__required"> *</span>
                </label>
                <input
                  className={`form__input
                    ${errors.date ? 'form__input--error' : ''}
                  `}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.date && (
                  <span className="form__error">{errors.date}</span>
                )}
              </div>

              <div className="form__group">
                <label className="form__label">City / Location</label>
                <input
                  className="form__input"
                  type="text"
                  name="city"
                  placeholder="Mumbai, Pune..."
                  value={form.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Event Type */}
            <div className="form__group">
              <label className="form__label">
                Event Type
                <span className="form__required"> *</span>
              </label>
              <select
                className={`form__input form__select
                  ${errors.eventType ? 'form__input--error' : ''}
                `}
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
              >
                <option value="">— Select Event Type —</option>
                {eventTypes.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
              {errors.eventType && (
                <span className="form__error">{errors.eventType}</span>
              )}
            </div>

            {/* Package */}
            <div className="form__group">
              <label className="form__label">
                Package Interested In
              </label>
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

            {/* Message */}
            <div className="form__group">
              <label className="form__label">
                Tell Us About Your Event
              </label>
              <textarea
                className="form__input form__textarea"
                name="message"
                placeholder="Venue, number of guests, special requirements, any questions..."
                value={form.message}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Submit */}
            <button
              className={`booknow__submit
                ${sending ? 'booknow__submit--sending' : ''}
              `}
              onClick={handleSubmit}
              disabled={sending}
            >
              {sending ? (
                <>
                  <i className="fas fa-spinner fa-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <i className="fab fa-whatsapp" />
                  Send Enquiry via WhatsApp
                </>
              )}
            </button>

            <p className="booknow__form-note">
              <i className="fas fa-lock" />
              Your details are safe with us. No spam, ever.
            </p>

          </div>
        </div>
      </section>

    </main>
  );
}

export default BookNow;