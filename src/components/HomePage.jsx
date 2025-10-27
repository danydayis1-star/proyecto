import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import About from './About';
import Team from './Team';
import Contact from './Contact';
import ChatBot from './ChatBot';
import Footer from './Footer';

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <Hero />
      <Services />
      <About />
      <Team />
      <Contact />
      <Footer />
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}
