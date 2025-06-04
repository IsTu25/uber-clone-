import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import backgroundImage from '../assets/images/uber.png'; // ✅ Correct import

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowForm(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      });

      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          showForm ? 'blur-sm scale-105' : ''
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})` // ✅ Using the imported image
        }}
      />

      {/* Login Form */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div
          className={`bg-white/90 backdrop-blur-md shadow-lg rounded-2xl w-full max-w-md p-8 transform transition-all duration-700 ${
            showForm ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="mt-1 w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            New here? <Link className="text-blue-600" to="/signup">Create an account</Link>
          </p>
          <Link
            to="/captain-login"
            className="block mt-4 text-center text-green-600 font-semibold"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
