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
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', width: '350px', color: '#000' }}>
        <h3 style={{ marginTop: 0 }}>Verify Account Required</h3>
        <p>
          A 6-digit code was sent to <strong>{target}</strong> via {isPhone ? 'WhatsApp' : 'Email'}.
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Verifying...' : 'Confirm Code'}
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 15px',
                backgroundColor: '#e5e7eb',
                color: '#374151',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
