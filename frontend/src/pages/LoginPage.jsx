import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';

const API_URL ='http://100.116.31.114:8000';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      navigate('/discovery');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface-bright">
      <TopNavBar />
      <div className="flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-primary/5">
          <h2 className="text-3xl font-black text-primary mb-2 text-center">Welcome Back</h2>
          <p className="text-center text-on-surface-variant mb-8">Sign in to your TenderFish account</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-outline mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-outline mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transition-all">Sign In</button>
          </form>
          
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Don't have an account? <Link to="/register" className="text-secondary font-bold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
