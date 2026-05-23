import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

function Cursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const [hidden,  setHidden]  = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let animId;

    // Move dot instantly, ring follows with lag
    const onMove = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    // Smooth ring follow via requestAnimationFrame
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    // Hide cursor when leaving window
    const onLeave  = () => setHidden(true);
    const onEnter  = () => setHidden(false);
    const onDown   = () => setClicked(true);
    const onUp     = () => setClicked(false);

    // Detect hoverable elements
    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    const hoverEls = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea, label'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      hoverEls.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
    };
  }, []);

  // Don't show on touch devices
  const isTouch = typeof window !== 'undefined' &&
    window.matchMedia('(hover: none)').matches;
  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor__dot
          ${hidden  ? 'cursor--hidden'  : ''}
          ${clicked ? 'cursor--clicked' : ''}
          ${hovered ? 'cursor--hovered' : ''}
        `}
      />
      <div
        ref={ringRef}
        className={`cursor__ring
          ${hidden  ? 'cursor--hidden'  : ''}
          ${clicked ? 'cursor--clicked' : ''}
          ${hovered ? 'cursor--hovered' : ''}
        `}
      />
    </>
  );
}

export default Cursor;