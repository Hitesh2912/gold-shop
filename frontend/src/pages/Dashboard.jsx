import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'orders', 'add'
  
  // Product state
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');

  // Orders state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/orders/all', config);
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'inventory') fetchProducts();
    
  }, [user, navigate, activeTab]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('http://localhost:5000/api/products', {
        name, price: Number(price), image, description, countInStock: Number(countInStock)
      }, config);
      alert('Product created successfully');
      setName(''); setPrice(''); setImage(''); setDescription(''); setCountInStock('');
      setActiveTab('inventory'); // switch back to see it
    } catch (error) {
      alert(error.response?.data?.message || 'Product creation failed');
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus }, config);
      alert('Order status updated!');
      setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      alert('Error updating status');
    }
  };

  const deleteProductHandler = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${productId}`, config);
        alert('Product deleted');
        setProducts(products.filter(p => p._id !== productId));
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting product');
      }
    }
  };

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="section-header">
          <span className="hero-subtitle">Platform Access</span>
          <h2>Admin Dashboard</h2>
          <div className="gold-line"></div>
        </div>

        {/* Dashboard Navigation */}
        <div style={{ display: 'flex', gap: '0', justifyContent: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          <button 
            style={{ 
              background: 'transparent', border: 'none', padding: '1rem 2rem', cursor: 'pointer',
              fontWeight: activeTab === 'inventory' ? '600' : '400',
              borderBottom: activeTab === 'inventory' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: activeTab === 'inventory' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory List
          </button>
          <button 
             style={{ 
              background: 'transparent', border: 'none', padding: '1rem 2rem', cursor: 'pointer',
              fontWeight: activeTab === 'add' ? '600' : '400',
              borderBottom: activeTab === 'add' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: activeTab === 'add' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
            onClick={() => setActiveTab('add')}
          >
            Upload New Item
          </button>
          <button 
             style={{ 
              background: 'transparent', border: 'none', padding: '1rem 2rem', cursor: 'pointer',
              fontWeight: activeTab === 'orders' ? '600' : '400',
              borderBottom: activeTab === 'orders' ? '2px solid var(--text-primary)' : '2px solid transparent',
              color: activeTab === 'orders' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
            onClick={() => setActiveTab('orders')}
          >
            Customer Orders
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Current Catalog</h3>
            {products.length === 0 ? (
               <p className="text-secondary" style={{ textAlign: 'center' }}>No products found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase' }}>Image</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase' }}>Price</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase' }}>Stock</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.8rem', textTransform: 'uppercase' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '0.5rem 1rem' }}><img src={product.image} alt={product.name} style={{ width: '40px', height: '60px', objectFit: 'cover' }} /></td>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>{product.name}</td>
                        <td style={{ padding: '1rem' }}>${product.price}</td>
                        <td style={{ padding: '1rem' }}>{product.countInStock}</td>
                        <td style={{ padding: '1rem' }}>
                          <button 
                            onClick={() => deleteProductHandler(product._id)}
                            style={{ padding: '0.4rem 0.8rem', backgroundColor: '#fff', border: '1px solid #ff4444', color: '#ff4444', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8rem' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="glass-card" style={{ padding: '3rem' }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Upload New Product</h3>
            <form onSubmit={submitHandler}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Product Name</label>
                  <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Gold Rolex" />
                </div>
                <div>
                  <label className="form-label">Price ($)</label>
                  <input type="number" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="50000" />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Image URL</label>
                  <input type="text" className="form-input" value={image} onChange={(e) => setImage(e.target.value)} required placeholder="https://..." />
                </div>
                <div>
                  <label className="form-label">Total Stock Count</label>
                  <input type="number" className="form-input" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required placeholder="5" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Editorial Description</label>
                <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Describe the materials, origin, and design..."></textarea>
              </div>
              
              <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
                Publish to Catalog
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>All Customer Orders</h3>
            {orders.length === 0 ? (
              <p className="text-secondary" style={{ textAlign: 'center' }}>No orders found in the system.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Order ID</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Customer</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Date</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Total</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Payment</th>
                      <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.8rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '1rem', fontWeight: '500' }}>#{order._id.substring(order._id.length - 6)}</td>
                        <td style={{ padding: '1rem' }}>
                          {order.user?.name || 'Unknown'}<br/>
                          <span className="text-secondary" style={{ fontSize: '0.8rem' }}>
                            {order.shippingAddress?.city}, {order.shippingAddress?.country}
                          </span>
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '1rem', fontWeight: 'bold' }}>${order.totalPrice.toFixed(2)}</td>
                        <td style={{ padding: '1rem', fontSize: '0.8rem' }}>{order.paymentMethod}</td>
                        <td style={{ padding: '1rem' }}>
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            style={{ 
                              padding: '0.4rem', 
                              borderRadius: '4px', 
                              border: '1px solid var(--border-light)',
                              fontFamily: 'inherit',
                              fontSize: '0.8rem',
                              backgroundColor: order.status === 'Delivered' ? '#e6f4ea' : order.status === 'Shipped' ? '#e8f0fe' : '#fef7e0',
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
