import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';

// ── Lazy load every page ──
const Home     = lazy(() => import('./pages/Home/Home'));
const About    = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Gallery  = lazy(() => import('./pages/Gallery/Gallery'));
const Packages = lazy(() => import('./pages/Packages/Packages'));
const BookNow  = lazy(() => import('./pages/BookNow/BookNow'));

// Simple full-screen loader shown while page chunk downloads
const PageLoader = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.4rem',
    color: 'var(--gold)',
    letterSpacing: '0.1em'
  }}>
    ✦ Loading...
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/book-now" element={<BookNow />} />
        </Routes>
      </Suspense>
      <WhatsAppFloat />
      <Footer />
    </Router>
  );
}

export default App;