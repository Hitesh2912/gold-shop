import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f3cb69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'The PARAMPARA Collection',
    title: 'Exquisite <br/><span style="color: var(--gold-primary); font-weight: 400;">Bridal Jewellery</span>',
    description: 'Celebrate your special day with our masterfully crafted gold and diamond bridal sets, designed to make you shine.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'PARAMPARA Everyday',
    title: 'Lightweight <br/><span style="color: var(--gold-primary); font-weight: 400;">Gold Designs</span>',
    description: 'Discover our new collection of lightweight, contemporary gold jewelry perfect for your everyday style.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515562141207-7a8ea4114e17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'PARAMPARA Elegance',
    title: 'Timeless <br/><span style="color: var(--gold-primary); font-weight: 400;">Diamonds</span>',
    description: 'Experience the brilliance of perfectly cut diamonds that capture the essence of forever.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds for a slower, more premium feel
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.scroll-animate');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <section id="home" className="hero" style={{ padding: 0, position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: currentSlide === index ? 1 : 0,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {/* Background Image with Ken Burns Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 7s ease-out',
            }} />
            
            {/* Elegant Dark Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, rgba(10, 10, 10, 0.85) 0%, rgba(10, 10, 10, 0.4) 50%, rgba(10, 10, 10, 0.1) 100%)',
            }} />

            <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
              <div className="hero-content" style={{ 
                maxWidth: '700px',
                transform: currentSlide === index ? 'translateY(0)' : 'translateY(30px)',
                opacity: currentSlide === index ? 1 : 0,
                transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                color: '#ffffff'
              }}>
                <span className="hero-subtitle" style={{ 
                  color: 'var(--gold-primary, #D4AF37)', 
                  letterSpacing: '5px', 
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  {slide.subtitle}
                </span>
                <h1 className="hero-title" style={{ color: '#ffffff', fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: '1.2', marginBottom: '1.5rem', fontWeight: '300', fontFamily: 'var(--font-heading)' }} dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                <p className="hero-description" style={{ color: '#f0f0f0', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: '1.7', maxWidth: '85%', fontWeight: '300' }}>{slide.description}</p>
                <div className="hero-buttons" style={{ display: 'flex', gap: '1.5rem' }}>
                  <Link to="/shop" className="btn-gold" style={{ padding: '1rem 2.5rem', background: 'var(--gold-primary, #D4AF37)', color: '#000', border: 'none', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', transition: 'all 0.3s ease' }}>Explore Collection</Link>
                  <Link to="/shop" className="btn-outline" style={{ padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.5)', color: '#fff', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', transition: 'all 0.3s ease', background: 'transparent' }} onMouseOver={e => { e.target.style.background = '#fff'; e.target.style.color = '#000'; }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}>Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Slider Controls (Dots) Customizing for better aesthetic */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 10 }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '30px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === idx ? 'var(--gold-primary, #D4AF37)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <section id="categories" className="section" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header scroll-animate" style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem' }}>Shop By Category</h2>
            <div className="brand-line"></div>
            <p className="text-secondary">Browse through our exquisite collection of meticulously crafted jewelry</p>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            flexWrap: 'wrap',
            padding: '1rem 0'
          }}>
            {[
              { name: 'Rings', img: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Necklaces', img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Earrings', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Bangles', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Pendants', img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
            ].map((cat, idx) => (
              <div key={idx} className="scroll-animate hover-lift" style={{ textAlign: 'center', cursor: 'pointer', transitionDelay: `${idx * 0.1}s` }}>
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 1rem',
                  border: '2px solid var(--border-light)',
                  padding: '5px'
                }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', transition: 'transform 0.5s ease' }} 
                       onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
                       onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="section" style={{ background: 'var(--bg-color-light)', padding: '5rem 0' }}>
        <div className="container">
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="about-content scroll-animate">
              <span className="hero-subtitle" style={{ color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Malabar Promise</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>100% Value on <br/>Diamond Exchange</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                We offer the best value for your diamonds. Get 100% value on diamond exchange across all our stores worldwide.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2.5rem' }}>
                {[
                  'Complete Transparency',
                  'Assured Lifetime Maintenance',
                  'Zero Deduction Gold Exchange',
                  'IGl & GIA Certified Diamonds'
                ].map(promise => (
                  <li key={promise} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 'bold' }}>✓</span> {promise}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary">Know More</Link>
            </div>
            <div className="about-image scroll-animate delay-200" style={{ overflow: 'hidden', borderRadius: '4px' }}>
              <img className="ken-burns" src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Malabar Promise" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* NEW LOOKBOOK GALLERY */}
      <section id="lookbook" className="section" style={{ padding: '8rem 0', backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div className="section-header scroll-animate" style={{ marginBottom: '4rem' }}>
            <span className="hero-subtitle" style={{ color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Curated Moments</span>
            <h2 style={{ fontSize: '2.5rem' }}>The Lookbook</h2>
            <div className="brand-line"></div>
            <p className="text-secondary" style={{ maxWidth: '500px', margin: '0 auto' }}>A visual journey through our most celebrated pieces, worn by those who define modern elegance.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', gridAutoRows: 'minmax(150px, auto)' }}>
            
            <div className="scroll-animate delay-100 hover-lift" style={{ gridColumn: 'span 7', gridRow: 'span 3', overflow: 'hidden', position: 'relative' }}>
              <img className="ken-burns" src="https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Bridal Jewelry Collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="scroll-animate delay-200 hover-lift" style={{ gridColumn: 'span 5', gridRow: 'span 2', overflow: 'hidden', position: 'relative' }}>
              <img className="ken-burns" src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Diamond Necklace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="scroll-animate delay-300 hover-lift" style={{ gridColumn: 'span 5', gridRow: 'span 3', overflow: 'hidden', position: 'relative' }}>
              <img className="ken-burns" src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Gold Bangles" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div className="scroll-animate delay-400 hover-lift" style={{ gridColumn: 'span 7', gridRow: 'span 2', overflow: 'hidden', position: 'relative' }}>
              <img className="ken-burns" src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Elegant Timepieces" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
