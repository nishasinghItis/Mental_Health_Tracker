import { Link } from 'react-router-dom'; 
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      console.log('Login successful:', res.data);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p className="text-sm text-center mt-4">
  Don't have an account?{' '}
  <Link to="/signup" className="text-blue-500 hover:underline">
    Sign up
  </Link>
</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      
      
    </div>
  );
};

export default Login;
