'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { user, setAuthState } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    setAuthState(null, null);
    router.push('/login');
  };
  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        marginBottom: '1rem',
      }}
    >
      <Link href="/" style={{ marginRight: '1rem' }}>
        Home
      </Link>
      {user ? (
        <>
          <Link href="/settings">Settings</Link> |
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginRight: '1rem' }}>
            Login
          </Link>
          <Link href="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
