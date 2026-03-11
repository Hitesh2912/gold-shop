import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://gold-shop-backend.onrender.com/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        <div className="section-header">
          <span className="hero-subtitle">The Collection</span>
          <h2>New Arrivals</h2>
          <div className="gold-line"></div>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No items currently available in the collection. Please check back later.</p>
        ) : (
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '2rem' }}>
            {products.map((product, index) => {
              const delayClass = `delay-${((index % 10) + 1) * 100}`;
              return (
              <div key={product._id} className={`glass-card hover-lift animate-cascade ${delayClass}`} style={{ padding: '0', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', border: 'none', backgroundColor: 'transparent' }}>
                
                {/* Retail Badge Logic */}
                {index === 0 && <span className="badge" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem' }}>New Arrival</span>}
                {product.countInStock < 3 && product.countInStock > 0 && <span className="badge" style={{ fontSize: '0.65rem', padding: '0.3rem 0.8rem', backgroundColor: '#b06000' }}>Low Stock</span>}

                <div style={{ height: '250px', marginBottom: '1.2rem', overflow: 'hidden', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.5s ease', padding: '1rem' }} 
                       onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
                       onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                
                <div style={{ padding: '0 0.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', fontWeight: '500', color: 'var(--text-primary)' }}>{product.name}</h3>
                  <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>${product.price}</span>
                  
                  {/* Malabar Trust Elements */}
                  <div className="trust-badge-row">
                    <span className="trust-badge">14 Days Return</span>
                    <span className="trust-badge">Lifetime Exchange</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                    <button 
                      onClick={() => addToCart({
                        product: product._id,
                        name: product.name,
                        image: product.image,
                        price: product.price,
                        qty: 1
                      })}
                      className="btn-gold" 
                      style={{ width: '100%', padding: '0.8rem', fontSize: '0.8rem' }}
                    >
                      Add to Bag
                    </button>
                    <button 
                      onClick={() => {
                        window.location.href = `/checkout/${product._id}`;
                      }}
                      className="btn-outline" 
                      style={{ width: '100%', padding: '0.8rem', fontSize: '0.8rem' }}
                    >
                      Buy It Now
                    </button>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
