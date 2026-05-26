import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://100.116.31.114:8000';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, company_name: company })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Registration failed');
      }
      toast('Account created! Please log in.', 'success');
      navigate('/login');
    } catch (err) {
      setError(err.message);
      toast(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-surface-bright">
      <div className="flex items-center justify-center pt-24 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-primary/5">
          <h2 className="text-3xl font-black text-primary mb-2 text-center">Join TenderFish</h2>
          <p className="text-center text-on-surface-variant mb-8">Start winning more tenders today</p>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-outline mb-1">Company Name</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full p-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-outline mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-outline mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none" required />
            </div>
            {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
            <button className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transition-all">Create Account</button>
          </form>
          
          <p className="mt-6 text-center text-sm text-on-surface-variant">
            Already have an account? <Link to="/login" className="text-secondary font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
