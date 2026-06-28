import HeroScene from '../components/HeroScene';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Profile from '../components/Profile';
import Work from '../components/Work';
import Stack from '../components/Stack';
import ContactFooter from '../components/ContactFooter';

export default function Page() {
  return (
    <>
      {/* Fixed WebGL background — renders behind the entire application */}
      <HeroScene />

      {/* column-grid overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none', opacity: 0.6,
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)',
        backgroundSize: 'calc(100vw/12) 100%',
      }} />

      <Nav />
      <Hero />
      <Profile />
      <Work />
      <Stack />
      <ContactFooter />
    </>
  );
}
