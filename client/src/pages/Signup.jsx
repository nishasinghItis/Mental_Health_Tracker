import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      console.log('✅ Registered:', res.data);
    } catch (err) {
      console.error('❌ Register error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Register
        </button>
        <p className="text-sm mt-2 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
        {message && <p className="text-center text-sm mt-2 text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
