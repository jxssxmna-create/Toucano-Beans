import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import VerifyModal from '../components/VerifyModal';

export default function Checkout({ user }) {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // التأكد من توثيق البريد الإلكتروني أو رقم الهاتف
  const isVerified = Boolean(user?.email_confirmed_at || user?.phone_confirmed_at);

  async function handlePlaceOrder() {
    if (!isVerified) {
      // إظهار نافذة التوثيق إذا لم يكن الحساب مفعلًا
      setShowVerifyModal(true);
      return;
    }

    // الحساب موثق -> إتمام الطلب مباشرة
    await completeOrder();
  }

  async function completeOrder() {
    setLoading(true);
    try {
      // يمكنك إضافة منطق حفظ الطلب في قاعدة بيانات Supabase هنا
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
