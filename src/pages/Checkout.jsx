import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VerifyModal from '../components/VerifyModal';

export default function Checkout({ user }) {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check whether the user's email or phone number is verified
  const isVerified = Boolean(user?.email_confirmed_at || user?.phone_confirmed_at);

  async function handlePlaceOrder() {
    if (!isVerified) {
      // Show verification modal if account is not activated
      setShowVerifyModal(true);
      return;
    }

    // Account verified -> complete order directly
    await completeOrder();
  }

  async function completeOrder() {
    setLoading(true);
    try {
      // Add Supabase database order insertion logic here
      alert('Order placed successfully! Delivery details sent to driver.');
    } catch (error) {
      console.error('Error placing order:', error.message);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '40px auto',
        padding: '24px',
        backgroundColor: '#fdf0de',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        color: '#000000',
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Checkout</h2>
      <p style={{ color: '#555' }}>Review your coffee cart and complete your order.</p>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: '#c84b1d',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.7 : 1,
          marginTop: '20px',
        }}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>

      {showVerifyModal && (
        <VerifyModal
          user={user}
          onVerified={() => {
            setShowVerifyModal(false);
            completeOrder();
          }}
          onClose={() => setShowVerifyModal(false)}
        />
      )}
    </div>
  );
}
