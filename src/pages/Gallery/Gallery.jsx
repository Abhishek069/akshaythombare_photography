import React, {
  useState, useEffect, useRef, useCallback, useMemo
} from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import images from './imageManifest';
import './Gallery.css';

const ALL = 'all';
const PREVIEW_COUNT = 2; // images shown per category in "All" tab

// Pull unique categories in order they first appear
const categories = [ALL, ...new Set(images.map(img => img.category))];

// ─────────────────────────────────────────────
// Single lazy image with blur-up effect
// ─────────────────────────────────────────────
function LazyImage({ src, alt, onClick }) {
  const [loaded,  setLoaded]  = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`gallery__item ${loaded ? 'gallery__item--loaded' : ''}`}
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={alt}
    >
      {!loaded && <div className="gallery__skeleton" />}
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
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

// ─────────────────────────────────────────────
// Category preview row shown inside "All" tab
// ─────────────────────────────────────────────
function CategoryPreview({ category, previewImages, onImageClick, onViewAll }) {
  return (
    <div className="gallery__preview-group">
      <div className="gallery__preview-header">
        <h3 className="gallery__preview-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>
        <button className="gallery__preview-viewall" onClick={() => onViewAll(category)}>
          View All <i className="fas fa-arrow-right" />
        </button>
      </div>
      <div className="gallery__preview-grid">
        {previewImages.map((img, index) => (
          <LazyImage
            key={img.id}
            src={`/images/gallery/${img.file}`}
            alt={img.alt}
            onClick={() => onImageClick(img, index)}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onNext, onPrev]);

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
        <img
          src={image.src}
          alt={image.alt}
          className="lightbox__img"
        />
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

// ─────────────────────────────────────────────
// Main Gallery Page
// ─────────────────────────────────────────────
function Gallery() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightbox, setLightbox]             = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.12 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll to top of gallery section on tab change
  useEffect(() => {
    const el = document.querySelector('.gallery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [activeCategory]);

  // Filtered images for non-All tabs
  const filtered = useMemo(() =>
    activeCategory === ALL
      ? images
      : images.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  // For All tab: group by category, take first PREVIEW_COUNT each
  const categoryGroups = useMemo(() => {
    const uniqueCats = [...new Set(images.map(img => img.category))];
    return uniqueCats.map(cat => ({
      category: cat,
      preview: images.filter(img => img.category === cat).slice(0, PREVIEW_COUNT),
    }));
  }, []);

  // Lightbox for category tab (uses filtered array)
  const openLightbox = useCallback((index) => {
    const img = filtered[index];
    setLightbox({ index, src: `/images/gallery/${img.file}`, alt: img.alt });
  }, [filtered]);

  // Lightbox for All tab preview (uses full images array)
  const openLightboxByImage = useCallback((img, _index) => {
    const realIndex = filtered.findIndex(i => i.id === img.id);
    setLightbox({
      index: realIndex >= 0 ? realIndex : 0,
      src: `/images/gallery/${img.file}`,
      alt: img.alt,
    });
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    setLightbox(prev => {
      const newIndex = (prev.index - 1 + filtered.length) % filtered.length;
      const img = filtered[newIndex];
      return { index: newIndex, src: `/images/gallery/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  const nextImage = useCallback(() => {
    setLightbox(prev => {
      const newIndex = (prev.index + 1) % filtered.length;
      const img = filtered[newIndex];
      return { index: newIndex, src: `/images/gallery/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  const handleViewAll = useCallback((category) => {
    setActiveCategory(category);
  }, []);

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

          <div className="reveal" ref={headerRef}>
            <SectionHeader
              tag="✦ Gallery"
              titleHtml="Stories Told Through <em>Every Frame</em>"
              center
            />
          </div>

          {/* ── Filter Tabs ── */}
          <div className="gallery__tabs" role="tablist">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`gallery__tab ${activeCategory === cat ? 'gallery__tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                {cat !== ALL && (
                  <span className="gallery__tab-count">
                    {images.filter(i => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── ALL TAB: category previews ── */}
          {activeCategory === ALL && (
            <div className="gallery__all-view">
              <p className="gallery__all-note">
                <i className="fas fa-images" />
                Showing <strong>{PREVIEW_COUNT} photos</strong> per category.
                Click any category to see all.
              </p>
              {categoryGroups.map(group => (
                <CategoryPreview
                  key={group.category}
                  category={group.category}
                  previewImages={group.preview}
                  onImageClick={openLightboxByImage}
                  onViewAll={handleViewAll}
                />
              ))}
            </div>
          )}

          {/* ── CATEGORY TAB: full masonry grid ── */}
          {activeCategory !== ALL && (
            <>
              <p className="gallery__count">
                Showing <strong>{filtered.length}</strong> photos in
                <strong> "{activeCategory}"</strong>
              </p>
              <div className="gallery__grid">
                {filtered.map((img, index) => (
                  <LazyImage
                    key={img.id}
                    src={`/images/gallery/${img.file}`}
                    alt={img.alt}
                    onClick={() => openLightbox(index)}
                  />
                ))}
              </div>
            </>
          )}

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