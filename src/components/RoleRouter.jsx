import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { supabase } from '../lib/supabaseClient';

export default function RoleRouter({ session, AdminView, DeliveryView, CustomerView }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!session?.user) return;
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
      
      setRole(data?.role || 'buyer');
      setLoading(false);
    }
    fetchRole();
  }, [session]);

  if (loading) return <div>Loading dashboard...</div>;

  if (role === 'admin') return <AdminView />;
  if (role === 'delivery') return <DeliveryView />;
  return <CustomerView />;
}
