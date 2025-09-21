'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const { token, setToken } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    setToken(null);
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
      {token ? (
        <button onClick={handleLogout}>Logout</button>
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
