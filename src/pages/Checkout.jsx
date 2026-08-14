import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VerifyModal from '../components/VerifyModal';

export default function Checkout({ user }) {
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // Check if user has verified their email or phone
  const isVerified = user?.email_confirmed_at || user?.phone_confirmed_at;

  async function handlePlaceOrder() {
    if (!isVerified) {
      // Trigger verification flow if not yet confirmed
      setShowVerifyModal(true);
      return;
    }

    // Account is verified -> proceed with placing order
    completeOrder();
  }

  async function completeOrder() {
    alert('Order placed successfully! Delivery details sent to driver.');
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto' }}>
      <h2>Checkout</h2>
      <p>Review your coffee cart and complete your order.</p>

      <button onClick={handlePlaceOrder} style={{ padding: '12px 24px', fontSize: '16px' }}>
        Place Order
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
