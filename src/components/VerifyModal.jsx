import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function VerifyModal({ user, onVerified, onClose }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const isPhone = !!user?.phone;
  const target = user?.phone || user?.email;

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        [isPhone ? 'phone' : 'email']: target,
        token: otp,
        type: isPhone ? 'sms' : 'signup',
      });

      if (error) throw error;
      alert('Verification successful!');
      onVerified(); // Triggers checkout completion
    } catch (err) {
      alert('Verification failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '350px' }}>
        <h3>Verify Account Required</h3>
        <p>A 6-digit code was sent to <strong>{target}</strong> via {isPhone ? 'WhatsApp' : 'Email'}.</p>

        <form onSubmit={handleVerify}>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Confirm Code'}</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
