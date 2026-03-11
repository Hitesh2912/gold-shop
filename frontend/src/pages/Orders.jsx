import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="section-header">
          <span className="hero-subtitle">Purchase History</span>
          <h2>My Orders</h2>
          <div className="gold-line"></div>
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p className="text-secondary" style={{ marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/shop')} className="btn-gold">Start Shopping</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order) => (
              <div key={order._id} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Order ID</span>
                    <span style={{ fontWeight: '600' }}>#{order._id.substring(order._id.length - 6)}</span>
                  </div>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Date</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Total</span>
                    <span className="text-gold" style={{ fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-secondary" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</span>
                    <span style={{ 
                      backgroundColor: order.status === 'Delivered' ? '#e6f4ea' : order.status === 'Shipped' ? '#e8f0fe' : '#fef7e0',
                      color: order.status === 'Delivered' ? '#137333' : order.status === 'Shipped' ? '#1967d2' : '#b06000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '16px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold'
                    }}>{order.status}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Items</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    {order.orderItems.map((item, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)', flex: '1 1 300px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{item.name}</p>
                          <p className="text-secondary" style={{ fontSize: '0.8rem' }}>Qty: {item.qty} × ${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fcfcfc', padding: '1rem', borderRadius: '8px' }}>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Payment Method: <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{order.paymentMethod}</span></span>
                  <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Paid: <span style={{ color: order.isPaid ? '#137333' : '#b06000', fontWeight: '500' }}>{order.isPaid ? 'Yes' : 'Pending'}</span></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
