import React, { useState } from 'react';
import api from '../Api/apis';
import '../style.css';
import { Building2 } from 'lucide-react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = {
        name,
        email,
        password,
        role: 'customer' // ✅ forcefully set customer role
      };

      await api.register(data);
      setSuccess('Registration successful! You can now log in.');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <div className="logo-container">
          <Building2 className="logo" />
        </div>
        <h2 className="title">Create Customer Account</h2>
        <p className="subtitle">Register to use the banking system</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
          <button className="submit-button" type="submit">
            Register
          </button>
        </form>
        <div className="footer">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
