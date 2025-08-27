// ReminderPage.jsx
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Only once in your app, can also be in App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const ReminderPage = () => {
  const [medicineName, setMedicineName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [reminders, setReminders] = useState([]);

  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  // Fetch reminders from backend (GET /api/reminders)
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:4000/api/reminders', {
        headers: { token }
      })
      .then(res => setReminders(res.data))
      .catch(() => setError('Failed to fetch reminders'));
  }, []);

  // Add a new reminder (POST /api/reminders)
  const handleAddReminder = async (e) => {
    e.preventDefault();
    setError('');
  
    // login check
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Login to add reminder');
      return navigate('/login');
    }
  
    if (!medicineName || !dateTime) {
      setError('Please fill out all fields');
      return;
    }
  
    try {
      const userEmail = localStorage.getItem('email');  // <<--- get email from localStorage
      const res = await axios.post(
        'http://localhost:4000/api/reminders',
        { medicineName, dateTime, userEmail },   // email is no longer needed!
        { headers: { token } }
      );
      setReminders([...reminders, res.data]);
      setMedicineName('');
      setDateTime('');
    } catch (err) {
      setError('Could not add reminder');
    } // <--- Only one closing brace here!
  };
  return (
    <div style={{
      maxWidth: 400,
      margin: '40px auto',
      padding: 24,
      border: '1px solid #ccc',
      borderRadius: 8,
      background: '#f9f9fa'
    }}>
      <h2 style={{ textAlign: 'center' }}>Medicine Reminders</h2>
      <form onSubmit={handleAddReminder} style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 12 }}>
  <label htmlFor="medicineName" style={{ display: 'block', marginBottom: 4 }}>Medicine Name</label>
  <input
    id="medicineName"
    type="text"
    value={medicineName}
    onChange={e => setMedicineName(e.target.value)}
    placeholder="Enter medicine name"
    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
    required
  />
</div>
<div style={{ marginBottom: 12 }}>
  <label htmlFor="reminderDateTime" style={{ display: 'block', marginBottom: 4 }}>Date and Time</label>
  <input
    id="reminderDateTime"
    type="datetime-local"
    value={dateTime}
    onChange={e => setDateTime(e.target.value)}
    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
    required
  />
</div>
      
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#4a90e2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '12px 0',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          Add Reminder
        </button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
      <div>
        <h3 style={{ marginBottom: 10 }}>Your Reminders</h3>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {(Array.isArray(reminders) ? reminders : []).map(rem => (
            <li key={rem._id || rem.id} style={{
              background: '#fff',
              padding: 12,
              border: '1px solid #ececec',
              borderRadius: 4,
              marginBottom: 10,
              fontSize: 15
            }}>
              <b>{rem.medicineName}</b>
              <div style={{ color: '#555' }}>
                  {rem.dateTime
                         ? (() => {
                   const d = new Date(rem.dateTime);
                   return isNaN(d) ? "Invalid Date" : d.toLocaleString();
                             })()
                      : "No date"}
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
 };

export default ReminderPage;
