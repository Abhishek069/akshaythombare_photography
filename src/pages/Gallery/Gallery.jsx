import React, {
  useState, useEffect, useRef,
  useCallback, useMemo
} from 'react';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import images from './imageManifest';
import './Gallery.css';

const ALL     = 'all';
const PREVIEW = 2;

// ── YouTube films data ──
const films = [
  {
    id: 'yt1',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Priya & Arjun — Wedding Film',
    category: 'Wedding',
    location: 'Mumbai',
    duration: '4:32',
  },
  {
    id: 'yt2',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Sneha & Rohan — Cinematic Highlights',
    category: 'Wedding',
    location: 'Pune',
    duration: '3:18',
  },
  {
    id: 'yt3',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Baby Aarav — 1st Birthday',
    category: 'Birthday',
    location: 'Borivali',
    duration: '2:45',
  },
  {
    id: 'yt4',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Meera — Maternity Film',
    category: 'Maternity',
    location: 'Dahisar',
    duration: '3:02',
  },
  {
    id: 'yt5',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Kapoor Family — Annual Gathering',
    category: 'Family',
    location: 'Kandivali',
    duration: '5:10',
  },
  {
    id: 'yt6',
    youtubeId: 'REPLACE_WITH_YOUTUBE_ID',
    title: 'Ananya & Vikram — Engagement Film',
    category: 'Engagement',
    location: 'Mumbai',
    duration: '2:55',
  },
];

const categories = [ALL, ...new Set(images.map(i => i.category))];

// ─────────────────────────────────────
// LazyImage — only loads when visible
// ─────────────────────────────────────
function LazyImage({ src, alt, onClick, priority = false }) {
  const [loaded,  setLoaded]  = useState(false);
  const [visible, setVisible] = useState(priority);
  const ref = useRef(null);

  useEffect(() => {
    if (priority) return; // load immediately
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // load 400px before visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      className={`gallery__item ${loaded ? 'gallery__item--loaded' : ''}`}
      ref={ref}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
      aria-label={`View ${alt}`}
    >
      {!loaded && <div className="gallery__skeleton" />}
      {visible && (
        <img
          src={src}
          alt={alt}
          width="400"
          height="300"
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className="gallery__img"
        />
      )}
      <div className="gallery__overlay">
        <div className="gallery__overlay-inner">
          <i className="fas fa-expand-alt" />
          <span>{alt}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────
// YouTube Film Card — iframe only on click
// ─────────────────────────────────────
function FilmCard({ film }) {
  const [playing, setPlaying] = useState(false);

  const thumb = `https://img.youtube.com/vi/${film.youtubeId}/mqdefault.jpg`;

  return (
    <div className="film__card">
      <div
        className={`film__thumb ${playing ? 'film__thumb--playing' : ''}`}
        onClick={() => setPlaying(true)}
      >
        {/* Thumbnail shown until user clicks play */}
        {!playing ? (
          <>
            <img
              src={thumb}
              alt={film.title}
              loading="lazy"
              decoding="async"
              className="film__thumb-img"
            />
            <div className="film__play">
              <div className="film__play-btn">
                <i className="fas fa-play" />
              </div>
              <span className="film__duration">{film.duration}</span>
            </div>
            <div className="film__overlay" />
          </>
        ) : (
          /* iframe only created when user clicks — saves bandwidth */
          <iframe
            className="film__iframe"
            src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Film info */}
      <div className="film__info">
        <div className="film__meta">
          <span className="film__category">{film.category}</span>
          <span className="film__location">
            <i className="fas fa-map-marker-alt" />
            {film.location}
          </span>
        </div>
        <h3 className="film__title">{film.title}</h3>
        {!playing && (
          <button
            className="film__watch-btn"
            onClick={() => setPlaying(true)}
          >
            <i className="fas fa-play" /> Watch Film
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────
// Category Preview (All tab)
// ─────────────────────────────────────
function CategoryPreview({ category, previewImages, onImageClick, onViewAll }) {
  return (
    <div className="gallery__preview-group">
      <div className="gallery__preview-header">
        <h3 className="gallery__preview-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>
        <button
          className="gallery__preview-viewall"
          onClick={() => onViewAll(category)}
        >
          View All <i className="fas fa-arrow-right" />
        </button>
      </div>
      <div className="gallery__preview-grid">
        {previewImages.map((img, i) => (
          <LazyImage
            key={img.id}
            src={`/images/${img.file}`}
            alt={img.alt}
            priority={i < 2}
            onClick={() => onImageClick(img)}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────
// Lightbox
// ─────────────────────────────────────
function Lightbox({ image, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

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

// ─────────────────────────────────────
// Main Gallery
// ─────────────────────────────────────
const TABS = ['photos', 'films'];

function Gallery() {
  const [mainTab,       setMainTab]       = useState('photos');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightbox,      setLightbox]      = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset category when switching main tab
  useEffect(() => {
    setActiveCategory(ALL);
  }, [mainTab]);

  const filtered = useMemo(() =>
    activeCategory === ALL
      ? images
      : images.filter(img => img.category === activeCategory),
    [activeCategory]
  );

  const categoryGroups = useMemo(() => {
    const cats = [...new Set(images.map(img => img.category))];
    return cats.map(cat => ({
      category: cat,
      preview: images
        .filter(img => img.category === cat)
        .slice(0, PREVIEW),
    }));
  }, []);

  const openLightbox = useCallback((index) => {
    const img = filtered[index];
    setLightbox({
      index,
      src: `/images/${img.file}`,
      alt: img.alt,
    });
  }, [filtered]);

  const openLightboxByImage = useCallback((img) => {
    const index = filtered.findIndex(i => i.id === img.id);
    setLightbox({
      index: index >= 0 ? index : 0,
      src: `/images/${img.file}`,
      alt: img.alt,
    });
  }, [filtered]);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    setLightbox(prev => {
      const i = (prev.index - 1 + filtered.length) % filtered.length;
      const img = filtered[i];
      return { index: i, src: `/images/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  const nextImage = useCallback(() => {
    setLightbox(prev => {
      const i = (prev.index + 1) % filtered.length;
      const img = filtered[i];
      return { index: i, src: `/images/${img.file}`, alt: img.alt };
    });
  }, [filtered]);

  return (
    <main className="page-wrapper">

      {/* ── Page Hero ── */}
      <section className="gallery-hero">
        <div className="gallery-hero__overlay" />
        <div className="gallery-hero__lines">
          <span /><span /><span />
        </div>
        <div className="gallery-hero__content">
          <span className="section-tag">✦ Our Portfolio</span>
          <h1 className="gallery-hero__title">
            Moments That Last <em>A Lifetime</em>
          </h1>
          <p className="gallery-hero__sub">
            Photos & Cinematic Films
          </p>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="gallery-section">
        <div className="gallery-section__inner">

          <div className="reveal" ref={headerRef}>
            <SectionHeader
              tag="✦ Portfolio"
              titleHtml="Stories Told Through <em>Every Frame</em>"
              center
            />
          </div>

          {/* ── Main tabs: Photos | Films ── */}
          <div className="gallery__main-tabs">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`gallery__main-tab
                  ${mainTab === tab ? 'gallery__main-tab--active' : ''}
                `}
                onClick={() => setMainTab(tab)}
              >
                <i className={
                  tab === 'photos'
                    ? 'fas fa-images'
                    : 'fas fa-film'
                } />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* ══════════════
              PHOTOS TAB
          ══════════════ */}
          {mainTab === 'photos' && (
            <>
              {/* Category filter tabs */}
              <div className="gallery__tabs" role="tablist">
                {categories.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`gallery__tab
                      ${activeCategory === cat ? 'gallery__tab--active' : ''}
                    `}
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

              {/* ALL tab — category previews */}
              {activeCategory === ALL && (
                <div className="gallery__all-view">
                  <p className="gallery__all-note">
                    <i className="fas fa-images" />
                    Showing <strong>{PREVIEW} photos</strong> per
                    category — click any tab to see all.
                  </p>
                  {categoryGroups.map(group => (
                    <CategoryPreview
                      key={group.category}
                      category={group.category}
                      previewImages={group.preview}
                      onImageClick={openLightboxByImage}
                      onViewAll={setActiveCategory}
                    />
                  ))}
                </div>
              )}

              {/* Category tab — full masonry */}
              {activeCategory !== ALL && (
                <>
                  <p className="gallery__count">
                    Showing <strong>{filtered.length}</strong> photos
                    in <strong>"{activeCategory}"</strong>
                  </p>
                  <div className="gallery__grid">
                    {filtered.map((img, index) => (
                      <LazyImage
                        key={img.id}
                        src={`/images/${img.file}`}
                        alt={img.alt}
                        priority={index < 4}
                        onClick={() => openLightbox(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* ══════════════
              FILMS TAB
          ══════════════ */}
          {mainTab === 'films' && (
            <div className="films__section">
              <p className="films__note">
                <i className="fas fa-play-circle" />
                Click any film to watch. Each film loads only when
                you play it — keeping this page fast.
              </p>
              <div className="films__grid">
                {films.map(film => (
                  <FilmCard key={film.id} film={film} />
                ))}
              </div>

              {/* YouTube channel CTA */}
              <div className="films__channel-cta">
                <p>Want to see more of our cinematic work?</p>
                <a
                  href="https://youtube.com/@yourchannel"
                  target="_blank"
                  rel="noreferrer"
                  className="films__channel-btn"
                >
                  <i className="fab fa-youtube" />
                  Visit Our YouTube Channel
                </a>
              </div>
            </div>
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