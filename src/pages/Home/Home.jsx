import React from 'react';
import Hero        from './sections/Hero';
import WhyChooseUs from './sections/WhyChooseUs';
import Reviews     from './sections/Reviews';

function Home() {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <Reviews />
    </main>
  );
}

export default Home;