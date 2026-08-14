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
    if (session?.user) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (err) {
      console.error(err.message);
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
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading account details...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Account Settings ({profile.role.toUpperCase()})</h2>
      
      <form onSubmit={updateProfile}>
        <div>
          <label>Email (Read Only)</label>
          <input type="text" value={profile.email || session.user.email} disabled />
        </div>

        <div>
          <label>Full Name</label>
          <input 
            type="text" 
            value={profile.full_name || ''} 
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} 
            required 
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input 
            type="tel" 
            value={profile.phone_number || ''} 
            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })} 
            required 
          />
        </div>

        <h3 style={{ marginTop: '20px' }}>Delivery Address</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
          <div>
            <label>Building No.</label>
            <input 
              type="text" 
              value={profile.building_number || ''} 
              onChange={(e) => setProfile({ ...profile, building_number: e.target.value })} 
              required
            />
          </div>
          <div>
            <label>Street No.</label>
            <input 
              type="text" 
              value={profile.street_number || ''} 
              onChange={(e) => setProfile({ ...profile, street_number: e.target.value })} 
              required
            />
          </div>
          <div>
            <label>Zone No.</label>
            <input 
              type="text" 
              value={profile.zone_number || ''} 
              onChange={(e) => setProfile({ ...profile, zone_number: e.target.value })} 
              required
            />
          </div>
        </div>

        <div style={{ marginTop: '15px' }}>
          <label>Google Maps Link</label>
          <input 
            type="url" 
            placeholder="https://maps.google.com/..." 
            value={profile.google_map_link || ''} 
            onChange={(e) => setProfile({ ...profile, google_map_link: e.target.value })} 
          />
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: '20px' }}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
