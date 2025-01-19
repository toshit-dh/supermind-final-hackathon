import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Help from './components/Help';
import Footer from './components/Footer';
import Analyze from './components/Analyze'
import { useEffect, useRef, useState } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  const [_, setActivePage] = useState('home');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars: { x: number; y: number; radius: number; alpha: number; speed: number; color: string }[] = [];
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.005 + 0.002, // Slower speed
        color: Math.random() > 0.5 ? 'white' : 'cyan', // Randomly choose white or cyan
      });
    }

    
    function drawStars() {
      if (!canvas) return;
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        star.alpha += star.speed;
        if (star.alpha > 1) {
          star.alpha = 0;
        }
      });

      requestAnimationFrame(drawStars);
    }

    drawStars();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen w-screen overflow-x-hidden transition-colors duration-300 bg-gray-900 dark:bg-black text-white">
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            <Route path="/analyze" element={<Analyze />} />
          </Routes>
        </BrowserRouter>
        <Footer setActivePage={setActivePage} />
      </div>
    </ThemeProvider>
  );
}

export default App;

