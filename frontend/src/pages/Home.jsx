import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1599643478524-fb66f7f3cb69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'The Grand Collection',
    title: 'Exquisite <br/><span className="text-brand">Bridal Jewellery</span>',
    description: 'Celebrate your special day with our masterfully crafted gold and diamond bridal sets, designed to make you shine.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'Everyday Elegance',
    title: 'Lightweight <br/><span className="text-gold">Gold Designs</span>',
    description: 'Discover our new collection of lightweight, contemporary gold jewelry perfect for your everyday style.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515562141207-7a8ea4114e17?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    subtitle: 'Solitaire Collection',
    title: 'Timeless <br/><span className="text-brand">Diamonds</span>',
    description: 'Experience the brilliance of perfectly cut diamonds that capture the essence of forever.'
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
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
      <section id="home" className="hero" style={{ padding: 0, position: 'relative' }}>
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
              transition: 'opacity 1s ease-in-out',
              zIndex: currentSlide === index ? 1 : 0,
              display: 'flex',
              alignItems: 'center',
              backgroundImage: `linear-gradient(to right, rgba(250, 249, 246, 0.95) 0%, rgba(250, 249, 246, 0.7) 40%, rgba(250, 249, 246, 0.2) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="container" style={{ width: '100%' }}>
              <div className="hero-content" style={{ maxWidth: '650px' }}>
                <span className="hero-subtitle">{slide.subtitle}</span>
                <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                <p className="hero-description">{slide.description}</p>
                <div className="hero-buttons">
                  <Link to="/shop" className="btn-gold">Explore The Collection</Link>
                  <Link to="/shop" className="btn-outline">Shop New Arrivals</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Slider Controls (Dots) */}
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '25px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: currentSlide === idx ? 'var(--eggplant-primary)' : 'rgba(153, 0, 87, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
