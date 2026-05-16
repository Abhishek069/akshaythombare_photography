import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import images from './imageManifest';
import './Gallery.css';

// ── Pull unique categories from manifest ──
const ALL = 'all';
const categories = [ALL, ...new Set(images.map(img => img.category))];

// ── Single lazy image — only loads when it enters viewport ──
function LazyImage({ src, alt, onClick }) {
  const [loaded,  setLoaded]  = useState(false);
  const [visible, setVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }   // start loading 200px before visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`gallery__item ${loaded ? 'gallery__item--loaded' : ''}`}
      ref={imgRef}
      onClick={onClick}
    >
      {/* Skeleton shown until image loads */}
      {!loaded && <div className="gallery__skeleton" />}

      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="gallery__img"
        />
      )}

      <div className="gallery__overlay">
        <i className="fas fa-expand-alt" />
      </div>
    </div>
  );
}

// ── Lightbox ──
function Lightbox({ image, onClose, onPrev, onNext }) {
  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">
        <i className="fas fa-times" />
      </button>

      <button
        className="lightbox__nav lightbox__nav--prev"
        onClick={e => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
      >
        <i className="fas fa-chevron-left" />
      </button>

      <div className="lightbox__content" onClick={e => e.stopPropagation()}>
        <img src={image.src} alt={image.alt} className="lightbox__img" />
        <p className="lightbox__caption">{image.alt}</p>
      </div>

      <button
        className="lightbox__nav lightbox__nav--next"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
      >
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
}

// ── Main Gallery Page ──
function Gallery() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightbox, setLightbox]             = useState(null); // { index, src, alt }
  const headerRef = useRef(null);

  // Scroll reveal for header
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filtered list — memoised so it only recalculates on category change
  const filtered = useMemo(() =>
    activeCategory === ALL
      ? images
      : images.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  // Lightbox helpers
  const openLightbox = useCallback((index) => {
    const img = filtered[index];
    setLightbox({ index, src: `images/${img.file}`, alt: img.alt });
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    setLightbox(prev => {
      const newIndex = (prev.index - 1 + filtered.length) % filtered.length;
      const img = filtered[newIndex];
      return { index: newIndex, src: `images/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  const nextImage = useCallback(() => {
    setLightbox(prev => {
      const newIndex = (prev.index + 1) % filtered.length;
      const img = filtered[newIndex];
      return { index: newIndex, src: `images/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  return (
    <main className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero__overlay" />
        <div className="gallery-hero__content">
          <span className="section-tag">✦ Our Portfolio</span>
          <h1 className="gallery-hero__title">
            Moments Frozen <em>In Time</em>
          </h1>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="gallery-section">
        <div className="gallery-section__inner">

          {/* Header */}
          <div className="reveal" ref={headerRef}>
            <SectionHeader
              tag="✦ Gallery"
              titleHtml="Stories Told Through <em>Every Frame</em>"
              center
            />
          </div>

          {/* Filter Tabs */}
          <div className="gallery__tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery__tab ${activeCategory === cat ? 'gallery__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="gallery__count">
            Showing <strong>{filtered.length}</strong> photos
            {activeCategory !== ALL && ` in "${activeCategory}"`}
          </p>

          {/* Masonry Grid */}
          <div className="gallery__grid">
            {filtered.map((img, index) => (
              <LazyImage
                key={img.id}
                src={`images/${img.file}`}
                alt={img.alt}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          image={lightbox}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

    </main>
  );
}

export default Gallery;