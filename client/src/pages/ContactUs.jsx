import React, { useState } from 'react';
import axios from 'axios';
import { Mail, Phone, Send } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/contact', formData);
      setResponseMsg('✅ Message sent successfully!');
      setFormData({ name: '', email: '',subject: '', message: '' });
console.log(res.data.message);
    } catch (err) {
      console.error(err);
      setResponseMsg('❌ Failed to send. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">📬 Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800"
        />
<input
  type="text"
  name="subject"
  placeholder="Subject"
  value={formData.subject}
  onChange={handleChange}
  required
  className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800"
/>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-800"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? 'Sending...' : 'Send Message'}</span>
        </button>
        {responseMsg && <p className="text-sm mt-2">{responseMsg}</p>}
      </form>

      <div className="mt-10 text-sm">
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4" /> support@talkspace.com
        </p>
        <p className="flex items-center gap-2 mt-1">
          <Phone className="w-4 h-4" /> +91-8760581168
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
