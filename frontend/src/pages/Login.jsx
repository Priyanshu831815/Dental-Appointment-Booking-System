import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        console.log('LOGIN RESPONSE:', data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          if (data.user && data.user._id) localStorage.setItem('userId', data.user._id);
          if (data.user && data.user.name) localStorage.setItem('name', data.user.name);
          if (data.user && data.user.email) localStorage.setItem('email', data.user.email);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        console.log('LOGIN RESPONSE:', data);
        if (data.success) {
          localStorage.setItem('token', data.token);
          if (data.user && data.user._id) localStorage.setItem('userId', data.user._id);
          if (data.user && data.user.name) localStorage.setItem('name', data.user.name);
          if (data.user && data.user.email) localStorage.setItem('email', data.user.email);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

 // Only redirect if token is a real non-empty string (not "false", not "")
 useEffect(() => {
  if (token && typeof token === 'string' && token !== 'false' && token !== '') {
    navigate('/');
  }
}, [token, navigate]);




  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full '>
              <p>Full Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
            </div>
          : null
        }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button
          className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'
          disabled={loading}
        >
          {loading ? 'Please wait...' : (state === 'Sign Up' ? 'Create account' : 'Login')}
        </button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  );
};

export default Login;