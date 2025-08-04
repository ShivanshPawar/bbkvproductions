import { useState } from "react";
import Loader from "./components/Loader";
import TargetCursor from './components/Cursor/TargetCursor/TargetCursor';
import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Shows from './components/Shows';
import Tracklist from './components/Tracklist'; 
import Accolades from './components/Accolades';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if we should disable smooth scrolling (for debugging)
  const disableSmoothScroll = false; // Set to true to disable smooth scrolling

  return (
    <div className="relative w-full min-h-screen">
      {isLoading && <Loader onFinish={() => setIsLoading(false)} />}
      {!isLoading && (
        <>
          {disableSmoothScroll ? (
            <main className="fonty w-full bg-black text-white animate-hero">
              <Navbar />
              <TargetCursor />
              <Hero />
              <About />
              <Shows />
              <Tracklist />
              <Accolades />
              <Contact />
              <Footer />
            </main>
          ) : (
            <SmoothScroll>
              <main className="fonty w-full bg-black text-white animate-hero">
                <Navbar />
                <TargetCursor />
                <Hero />
                <About />
                <Shows />
                <Tracklist />
                <Accolades />
                <Contact />
                <Footer />
              </main>
            </SmoothScroll>
          )}
        </>
      )}
    </div>
  );
}

export default App;
