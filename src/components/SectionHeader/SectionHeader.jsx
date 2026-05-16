import React from 'react';

function SectionHeader({ tag, title, titleHtml, center = false, light = false }) {
  return (
    <div className={center ? 'center' : ''} style={{ marginBottom: '0' }}>
      {tag && <span className="section-tag">{tag}</span>}

      {titleHtml ? (
        <h2
          className="section-title"
          style={light ? { color: 'var(--white)' } : {}}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
      ) : (
        <h2
          className="section-title"
          style={light ? { color: 'var(--white)' } : {}}
        >
          {title}
        </h2>
      )}

      <div className="section-line" />
    </div>
  );
}

export default SectionHeader;