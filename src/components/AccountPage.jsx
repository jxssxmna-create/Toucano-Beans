import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AccountPage({ session }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    building_number: '',
    street_number: '',
    zone_number: '',
    google_map_link: '',
    role: 'buyer',
  });

  useEffect(() => {
    if (session?.user) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      if (data) {
        setProfile(data);
      } else {
        setProfile((prev) => ({ ...prev, email: session.user.email }));
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const updates = {
        id: session.user.id,
        email: session.user.email,
        full_name: profile.full_name,
        phone_number: profile.phone_number,
        building_number: profile.building_number,
        street_number: profile.street_number,
        zone_number: profile.zone_number,
        google_map_link: profile.google_map_link,
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Address and profile saved successfully!');
    } catch (err) {
      alert('خطأ أثناء حفظ البيانات: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // إذا لم يكن المستخدم مسجلاً لدخوله
  if (!session) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>يرجى تسجيل الدخول لعرض وتعديل بيانات الحساب والعنوان.</p>
      </div>
    );
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading account details...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Account Settings ({profile.role?.toUpperCase() || 'BUYER'})</h2>
        <button 
          type="button"
          onClick={() => supabase.auth.signOut()} 
          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Sign Out
        </button>
      </div>
      
      <form onSubmit={updateProfile}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email (Read Only)</label>
          <input 
            type="text" 
            value={profile.email || session.user.email} 
            disabled 
            style={{ width: '100%', padding: '8px', backgroundColor: '#f1f5f9', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
          <input 
            type="text" 
            value={profile.full_name || ''} 
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} 
            required 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number</label>
          <input 
            type="tel" 
            value={profile.phone_number || ''} 
            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })} 
            required 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <h3 style={{ marginTop: '25px', marginBottom: '10px' }}>Delivery Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Building No.</label>
            <input 
              type="text" 
              value={profile.building_number || ''} 
              onChange={(e) => setProfile({ ...profile, building_number: e.target.value })} 
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Street No.</label>
            <input 
              type="text" 
              value={profile.street_number || ''} 
              onChange={(e) => setProfile({ ...profile, street_number: e.target.value })} 
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Zone No.</label>
            <input 
              type="text" 
              value={profile.zone_number || ''} 
              onChange={(e) => setProfile({ ...profile, zone_number: e.target.value })} 
              required
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Google Maps Link</label>
          <input 
            type="url" 
            placeholder="https://maps.google.com/..." 
            value={profile.google_map_link || ''} 
            onChange={(e) => setProfile({ ...profile, google_map_link: e.target.value })} 
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
