import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      const { data } = await axios.post(`${API}${endpoint}`, payload);
      login(data);
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '420px', width: '100%', padding: '0 1rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span className="hero-subtitle" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Become a Member'}</span>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{isLogin ? 'Sign In' : 'Register'}</h2>
            <div className="gold-line" style={{ width: '30px', margin: '1rem auto' }}></div>
          </div>

          <form onSubmit={submitHandler}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            
            <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '1rem' }}>
              {isLogin ? 'Sign In' : 'Register'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
            {isLogin ? "Don't have an account? " : "Already a member? "}
            <span 
              className="text-gold" 
              style={{ cursor: 'pointer', fontWeight: 'bold' }} 
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register Here' : 'Sign In'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
