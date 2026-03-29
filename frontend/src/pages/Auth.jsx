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
    if (user) navigate('/');
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
    <>
      <style>{`
        @media (max-width: 600px) {
          .auth-wrapper {
            padding-top: 6rem !important;
            align-items: flex-start !important; /* Fixes top cutoff when keyboard opens */
          }
          .auth-card-responsive {
            padding: 1.75rem 1.25rem !important; /* Less padding on small screens */
            box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important;
          }
          .auth-container-safe {
            padding: 1.5rem 1.25rem 3rem !important; /* Proper bottom padding */
          }
        }
      `}</style>
      <section
        className="section auth-wrapper"
        style={{
          paddingTop: '8rem',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #fff7f2, #fdf1e7)'
        }}
      >
        <div className="container auth-container-safe" style={{ maxWidth: '420px', width: '100%', padding: '0 1rem' }}>
          <div
            className="glass-card auth-card-responsive"
            style={{
              padding: '2.5rem',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}
          >
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span
              className="hero-subtitle"
              style={{
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
                color: '#a67c52',
                letterSpacing: '1px'
              }}
            >
              {isLogin ? 'Welcome Back' : 'Become a Member'}
            </span>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              {isLogin ? 'Sign In' : 'Register'}
            </h2>

            <div
              style={{
                width: '40px',
                height: '2px',
                background: 'linear-gradient(to right, #d4af37, #f5d27a)',
                margin: '1rem auto'
              }}
            ></div>
          </div>

          <form onSubmit={submitHandler}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* ⭐ PREMIUM BUTTON */}
            <button
              type="submit"
              style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '14px',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #d4af37, #b8962e)',
                boxShadow: '0 6px 15px rgba(212, 175, 55, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 25px rgba(212, 175, 55, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 6px 15px rgba(212, 175, 55, 0.4)';
              }}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              color: '#666'
            }}
          >
            {isLogin ? "Don't have an account? " : "Already a member? "}
            <span
              style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: '#b8962e'
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register Here' : 'Sign In'}
            </span>
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Auth;