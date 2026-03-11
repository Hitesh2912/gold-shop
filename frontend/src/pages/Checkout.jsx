import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { id: productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default to UPI as requested alongside Online and COD
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: ''
  });

  useEffect(() => {
    if (!user) {
      alert('Please log in to checkout.');
      navigate('/login');
      return;
    }

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product for checkout:', error);
        alert('Product not found.');
        navigate('/shop');
      }
    };

    fetchProduct();
  }, [productId, user, navigate]);

  const checkoutHandler = async () => {
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
      alert('Please complete the shipping address form.');
      return;
    }
    
    if (paymentMethod === 'UPI' && !upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., username@okbank)');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      
      const singleOrderItem = [{
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: 1
      }];

      const finalPaymentMethod = paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod;

      await axios.post('http://localhost:5000/api/orders', {
        orderItems: singleOrderItem,
        totalPrice: product.price,
        paymentMethod: finalPaymentMethod,
        shippingAddress
      }, config);
      
      alert(`Order placed successfully using ${paymentMethod}!`);
      navigate('/my-orders');
    } catch (error) {
      alert('Error placing direct order. Please try again.');
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  if (loading) return <div style={{ paddingTop: '10rem', textAlign: 'center' }}>Loading Secure Checkout...</div>;

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="hero-subtitle">Secure Direct Purchase</span>
          <h2 style={{ fontSize: '2.5rem' }}>Checkout</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
          <div>
            {/* Shipping Address Section */}
            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Shipping Address</h3>
              
              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input type="text" name="address" className="form-input" value={shippingAddress.address} onChange={handleAddressChange} required placeholder="123 Luxury Ave, Apt 4B" />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">City</label>
                  <input type="text" name="city" className="form-input" value={shippingAddress.city} onChange={handleAddressChange} required placeholder="Mumbai" />
                </div>
                <div>
                  <label className="form-label">Postal Code</label>
                  <input type="text" name="postalCode" className="form-input" value={shippingAddress.postalCode} onChange={handleAddressChange} required placeholder="400001" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input type="text" name="country" className="form-input" value={shippingAddress.country} onChange={handleAddressChange} required placeholder="India" />
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.4rem' }}>Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                
                <div style={{ border: paymentMethod === 'UPI' ? '2px solid var(--maroon-primary)' : '1px solid var(--border-light)', backgroundColor: paymentMethod === 'UPI' ? 'rgba(153, 0, 87, 0.03)' : '#fff', padding: '1.2rem', transition: 'all 0.3s ease' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>UPI (GPay, PhonePe, Paytm)</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instant & Secure Bank Transfer</span>
                    </div>
                  </label>
                  
                  {paymentMethod === 'UPI' && (
                    <div style={{ marginTop: '1rem', paddingLeft: '2rem', animation: 'fadeIn 0.3s ease-in' }}>
                      <label className="form-label" style={{ fontSize: '0.75rem', marginBottom: '0.3rem' }}>Virtual Payment Address (VPA)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. yourname@okicici" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{ padding: '0.8rem', fontSize: '0.9rem' }}
                      />
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>A payment request will be sent to this UPI ID.</p>
                    </div>
                  )}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.2rem', border: paymentMethod === 'Online Payment' ? '2px solid var(--maroon-primary)' : '1px solid var(--border-light)', backgroundColor: paymentMethod === 'Online Payment' ? 'rgba(153, 0, 87, 0.03)' : '#fff' }}>
                  <input 
                    type="radio" 
                    value="Online Payment"
                    checked={paymentMethod === 'Online Payment'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>Credit / Debit Card</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Visa, MasterCard, Amex</span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.2rem', border: paymentMethod === 'Cash on Delivery' ? '2px solid var(--maroon-primary)' : '1px solid var(--border-light)', backgroundColor: paymentMethod === 'Cash on Delivery' ? 'rgba(153, 0, 87, 0.03)' : '#fff' }}>
                  <input 
                    type="radio" 
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>Cash on Delivery (COD)</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Pay when you receive your jewelry</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="glass-card" style={{ height: 'fit-content', padding: '2.5rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '2rem', fontSize: '1.4rem' }}>Order Summary</h3>
            
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={product.image} alt={product.name} style={{ width: '80px', height: '100px', objectFit: 'cover', border: '1px solid var(--border-light)', borderRadius: '2px' }} />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{product.name}</h4>
                <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Quantity: 1</p>
                <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>${product.price}</p>
              </div>
            </div>

            <div style={{ borderTop: '2px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="text-secondary">Subtotal</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>${product.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="text-secondary">Shipping</span>
                <span style={{ fontWeight: '600', color: 'var(--maroon-primary)' }}>Complimentary</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1rem' }}>
                <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Total to Pay</span>
                <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--maroon-primary)' }}>${product.price}</span>
              </div>
              
              <button 
                onClick={checkoutHandler} 
                className="btn-gold" 
                style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', marginTop: '1rem' }}
              >
                Place Secure Order 
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
