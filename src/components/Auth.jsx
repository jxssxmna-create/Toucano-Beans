import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Auth() {
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // E.g., +97412345678
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      let result;
      if (method === 'email') {
        result = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
      } else {
        result = await supabase.auth.signUp({
          phone,
          password,
          options: { 
            data: { full_name: fullName },
            channel: 'whatsapp' // Sends OTP via WhatsApp channel
          },
        });
      }

      if (result.error) throw result.error;
      alert('Account created! You can now log in and add items to your cart.');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Sign Up</h2>
      <div style={{ marginBottom: '15px' }}>
        <button type="button" onClick={() => setMethod('email')}>Email</button>
        <button type="button" onClick={() => setMethod('phone')}>WhatsApp / Phone</button>
      </div>

      <form onSubmit={handleSignUp}>
        <div>
          <label>Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        {method === 'email' ? (
          <div>
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        ) : (
          <div>
            <label>WhatsApp Number (with country code, e.g. +974...)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
        )}

        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Create Account</button>
      </form>
    </div>
  );
}
