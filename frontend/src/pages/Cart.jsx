import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    address: '', city: '', postalCode: '', country: ''
  });

  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  const checkoutHandler = async () => {
    if (!user) {
      alert('Please log in to checkout.');
      navigate('/login');
      return;
    }

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
      
      const finalPaymentMethod = paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod;

      await axios.post(`${API}/api/orders`, {
        orderItems: cartItems,
        totalPrice: total,
        paymentMethod: finalPaymentMethod,
        shippingAddress
      }, config);
      
      alert(`Order placed successfully using ${paymentMethod}!`);
      clearCart();
      navigate('/my-orders');
    } catch (error) {
      alert('Error placing order. Please try again.');
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <div className="container">
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="hero-subtitle">Your Selection</span>
          <h2 style={{ fontSize: '2rem' }}>Checkout</h2>
        </div>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p className="text-secondary" style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Your shopping bag is empty.</p>
            <button onClick={() => navigate('/shop')} className="btn-gold">Continue Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
            <div>
              {/* Shipping Address Section */}
              <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Shipping Address</h3>
                
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input type="text" name="address" className="form-input" value={shippingAddress.address} onChange={handleAddressChange} required placeholder="123 Luxury Ave, Apt 4B" />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label className="form-label">City</label>
                    <input type="text" name="city" className="form-input" value={shippingAddress.city} onChange={handleAddressChange} required placeholder="New York" />
                  </div>
                  <div>
                    <label className="form-label">Postal Code</label>
                    <input type="text" name="postalCode" className="form-input" value={shippingAddress.postalCode} onChange={handleAddressChange} required placeholder="10001" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input type="text" name="country" className="form-input" value={shippingAddress.country} onChange={handleAddressChange} required placeholder="United States" />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--text-primary)' }}>Payment Method</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  <div style={{ border: paymentMethod === 'UPI' ? '2px solid var(--maroon-primary)' : '1px solid var(--border-light)', backgroundColor: paymentMethod === 'UPI' ? 'rgba(153, 0, 87, 0.03)' : '#fff', padding: '1rem', transition: 'all 0.3s ease' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>UPI (GPay, PhonePe, Paytm)</span>
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
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Credit Card / Secure Online</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', padding: '1.2rem', border: paymentMethod === 'Cash on Delivery' ? '2px solid var(--maroon-primary)' : '1px solid var(--border-light)', backgroundColor: paymentMethod === 'Cash on Delivery' ? 'rgba(153, 0, 87, 0.03)' : '#fff' }}>
                    <input 
                      type="radio" 
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Cash on Delivery (COD)</span>
                  </label>

                </div>
              </div>
            </div>
            
            {/* Order Summary Sidebar */}
            <div className="glass-card" style={{ height: 'fit-content', padding: '2rem' }}>
              <h3 style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Order Summary</h3>
              
              <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cartItems.map((item) => (
                  <div key={item.product} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{item.name}</h4>
                      <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Qty: {item.qty}</p>
                      <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product)} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '1.5rem', padding: '0.5rem' }}>×</button>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="text-secondary">Subtotal</span>
                  <span style={{ fontWeight: '500' }}>${total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="text-secondary">Shipping</span>
                  <span style={{ fontWeight: '500' }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Estimated Total</span>
                  <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>${total}</span>
                </div>
                
                <button 
                  onClick={checkoutHandler} 
                  className="btn-gold" 
                  style={{ width: '100%', padding: '1.2rem', fontSize: '1rem' }}
                >
                  {user ? 'Place Secure Order' : 'Sign In to Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
