import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // دالة التسجيل وتسجيل الدخول بـ Supabase
  async function handleAuth(e) {
    e.preventDefault(); // يمنع المتصفح من إعادة التحميل أو إظهار Action submitted!
    setAuthLoading(true);
    setErrorMessage('');

    try {
      if (isSignUp) {
        // 1. إنشاء حساب جديد
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName, // حفظ الاسم في بيانات حساب المستخدم
            },
          },
        });

        if (error) throw error;
        alert('تم إنشاء الحساب بنجاح!');
      } else {
        // 2. تسجيل الدخول للحسابات القديمة
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) throw error;
        alert('تم تسجيل الدخول بنجاح!');
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setAuthLoading(false);
    }
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '50px auto', 
      padding: '24px', 
      border: '1px solid #e2e8f0', 
      borderRadius: '12px', 
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif' 
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>
        {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
      </h2>

      {/* عرض رسائل الخطأ إن وجدت */}
      {errorMessage && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fee2e2', 
          color: '#dc2626', 
          borderRadius: '6px', 
          marginBottom: '15px', 
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleAuth}>
        {/* إظهار حقل الاسم الكامل في حالة إنشاء حساب جديد فقط */}
        {isSignUp && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>الاسم الكامل</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="الاسم الثلاثي"
              required={isSignUp}
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
          </div>
        )}

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@domain.com"
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>كلمة السر</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={6}
            required
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <button
          type="submit"
          disabled={authLoading}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: authLoading ? 'not-allowed' : 'pointer',
            opacity: authLoading ? 0.7 : 1,
          }}
        >
          {authLoading ? 'جاري الإرسال...' : isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول'}
        </button>
      </form>

      {/* زر التبديل بين التسجيل وتسجيل الدخول */}
      <button
        type="button"
        onClick={() => {
          setIsSignUp(!isSignUp);
          setErrorMessage('');
        }}
        style={{
          background: 'none',
          border: 'none',
          color: '#2563eb',
          marginTop: '16px',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center',
          fontSize: '14px',
        }}
      >
        {isSignUp ? 'لديك حساب بالفعل؟ سجل الدخول من هنا' : 'ليس لديك حساب؟ انقر هنا للتسجيل'}
      </button>
    </div>
  );
}
