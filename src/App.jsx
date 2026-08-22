import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import AccountPage from './components/AccountPage';
import SignUp from './pages/signup';

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // جلب الجلسة الحالية من Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // الاستماع للتغيرات (تسجيل دخول / خروج)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>جاري التحميل...</div>;
  }

  return session ? <AccountPage session={session} /> : <SignUp />;
}
