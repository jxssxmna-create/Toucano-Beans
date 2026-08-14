import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // e.g., +97412345678
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        // --- SIGN UP LOGIC ---
        let response;
        if (method === 'email') {
          response = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName },
            },
          });
        } else {
          response = await supabase.auth.signUp({
            phone,
            password,
            options: {
              data: { full_name: fullName },
              channel: 'whatsapp',
            },
          });
        }

        if (response.error) throw response.error;

        if (response.data?.session) {
          setMessage({ type: 'success', text: 'Account created successfully! Welcome.' });
          window.location.reload(); // Refresh to load session state across app
        } else {
          setMessage({
            type: 'success',
            text: 'Account created! Please check your Email/WhatsApp if verification is required.',
          });
        }
      } else {
        // --- LOG IN LOGIC ---
        let response;
        if (method === 'email') {
          response = await supabase.auth.signInWithPassword({ email, password });
        } else {
          response = await supabase.auth.signInWithPassword({ phone, password });
        }

        if (response.error) throw response.error;

        setMessage({ type: 'success', text: 'Logged in successfully!' });
        window.location.reload();
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: '420px',
        margin: '40px auto',
        padding: '30px',
        backgroundColor: '#fdf0de',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        color: '#000000',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isSignUp ? 'Create Account' : 'Welcome Back'}
      </h2>

      {/* Mode Switcher: Sign Up vs Log In */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => setIsSignUp(true)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isSignUp ? '#ff6b00' : '#e0e0e0',
            color: isSignUp ? '#ffffff' : '#000000',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => setIsSignUp(false)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: !isSignUp ? '#ff6b00' : '#e0e0e0',
            color: !isSignUp ? '#ffffff' : '#000000',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Log In
        </button>
      </div>

      {/* Method Switcher: Email vs WhatsApp/Phone */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '20px',
          fontSize: '14px',
        }}
      >
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            name="method"
            checked={method === 'email'}
            onChange={() => setMethod('email')}
          />{' '}
          Email
        </label>
        <label style={{ cursor: 'pointer' }}>
          <input
            type="radio"
            name="method"
            checked={method === 'phone'}
            onChange={() => setMethod('phone')}
          />{' '}
          WhatsApp / Phone
        </label>
      </div>

      {/* Feedback Alert Message */}
      {message && (
        <div
          style={{
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '15px',
            fontSize: '14px',
            backgroundColor: message.type === 'error' ? '#ffd2d2' : '#d2ffd2',
            color: message.type === 'error' ? '#d80000' : '#008000',
          }}
        >
          {message.text}
        </div>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {isSignUp && (
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              FULL NAME
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jassim Alyafei"
              required={isSignUp}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {method === 'email' ? (
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ) : (
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
              WHATSAPP / PHONE (+ country code)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+97412345678"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#c84b1d',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
