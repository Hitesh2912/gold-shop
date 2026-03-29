import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import GenericPage from './pages/GenericPage';

function App() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Custom navbar scroll logic
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50 || location.pathname !== '/') {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <>
      <header className="navbar">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="container flex-between">
            <div className="top-bar-left" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <span>Customer Care: 1800 500 0000</span>
              <Link to="/admin" style={{ color: '#cda86f', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '1px' }}>
                ADMINISTRATIVE DASHBOARD
              </Link>
            </div>
            <div className="top-bar-links">
              {/* <Link to="/store-locator">Store Locator</Link>
              <Link to="/track-order">Track Order</Link>
              <Link to="/contact">Contact Us</Link> */}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="navbar-main">
          <div className="container nav-container">
            <Link to="/" className="nav-logo">
              <span className="text-brand">PARAMPARA</span>
              <span style={{ fontSize: '1rem', display: 'block', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 400 }}>GOLD & DIAMONDS</span>
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Home</Link>
              
              <div className="dropdown">
                <Link to="/shop" className="nav-link dropdown-toggle">
                  Shop <span style={{ fontSize: '0.7em', marginLeft: '4px' }}>▼</span>
                </Link>
                <div className="dropdown-menu">
                  <Link to="/shop?category=Gold" className="dropdown-item">Gold Jewellery</Link>
                  <Link to="/shop?category=Diamond" className="dropdown-item">Diamond Collection</Link>
                  <Link to="/shop?category=Silver" className="dropdown-item">Silver Artifacts</Link>
                  <Link to="/shop?category=Platinum" className="dropdown-item">Platinum Elegance</Link>
                  <Link to="/shop?category=Watches" className="dropdown-item">Luxury Watches</Link>
                  <Link to="/shop?category=Gifts" className="dropdown-item">Gifting</Link>
                </div>
              </div>

              <Link to="/about" className="nav-link">Our Story</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="nav-actions" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {/* Dynamic Icons */}
              <Link to="/search" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </Link>
              <Link to="/wishlist" style={{ textDecoration: 'none', color: 'var(--brand-primary)', fontSize: '1.2rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </Link>
              
              {user ? (
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <Link to="/my-orders" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </Link>
                  <span style={{ cursor: 'pointer', color: 'var(--text-primary)' }} onClick={logout}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  </span>
                </div>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </Link>
              )}
              
              <Link to="/cart" style={{ textDecoration: 'none', color: 'var(--text-primary)', position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'var(--brand-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}>
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              </Link>

              <button 
                className="mobile-menu-toggle" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                &#9776;
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-header">
            <Link to="/" className="nav-logo" onClick={() => setIsMobileMenuOpen(false)}>
              <span className="text-brand" style={{ fontSize: '1.5rem' }}>PARAMPARA</span>
            </Link>
            <button className="mobile-nav-close" onClick={() => setIsMobileMenuOpen(false)}>
              &times;
            </button>
          </div>
          <div className="mobile-nav-body">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Shop Collections</Link>
            <Link to="/shop?category=Gold" className="mobile-nav-link" style={{ fontSize: '1rem', paddingLeft: '1rem', fontWeight: 400, marginBottom: '1rem' }} onClick={() => setIsMobileMenuOpen(false)}>• Gold Jewellery</Link>
            <Link to="/shop?category=Diamond" className="mobile-nav-link" style={{ fontSize: '1rem', paddingLeft: '1rem', fontWeight: 400, marginBottom: '1rem' }} onClick={() => setIsMobileMenuOpen(false)}>• Diamond Collection</Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      </header>

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<Dashboard />} />
          
          {/* Catch-all for placeholder links */}
          <Route path="/store-locator" element={<GenericPage title="Store Locator" />} />
          <Route path="/track-order" element={<GenericPage title="Track Order" />} />
          <Route path="/contact" element={<GenericPage title="Contact Us" />} />
          <Route path="/about" element={<GenericPage title="About Us" />} />
          <Route path="*" element={<GenericPage title="Page Under Construction" />} />
        </Routes>
      </main>

      <footer className="footer" style={{ borderTop: 'none', backgroundColor: '#111', color: '#ccc', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'left', marginBottom: '3rem' }}>
            <div>
              <Link to="/" className="nav-logo" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>
                <span className="text-gold">PARAMPARA</span>
              </Link>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                Parampara Gold & Diamonds is the flagship company of Malabar Group. It was established in 1993 in Kozhikode, Kerala.
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', fontSize: '1rem' }}>Customer Service</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Contact Us', 'Track Order', 'Return Policy', 'Shipping Policy'].map(item => (
                  <li key={item} style={{ marginBottom: '0.8rem' }}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', fontSize: '1rem' }}>About Us</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Our Story', 'Investors', 'Careers', 'Store Locator'].map(item => (
                  <li key={item} style={{ marginBottom: '0.8rem' }}>
                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ color: '#fff', marginBottom: '1.2rem', textTransform: 'uppercase', fontSize: '1rem' }}>Newsletter</h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              <div style={{ display: 'flex' }}>
                <input type="email" placeholder="Enter your email" style={{ padding: '0.8rem', width: '100%', border: 'none', borderRadius: '2px 0 0 2px', background: '#222', color: '#fff' }} />
                <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '0 2px 2px 0' }}>JOIN</button>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
            <p>© {new Date().getFullYear()} Parampara Gold & Diamonds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
