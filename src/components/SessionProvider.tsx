'use client';

import { useAuthStore } from '@/store/auth.store';
import { useEffect, useState } from 'react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAuthState } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const csrfRes = await fetch(`${apiUrl}/users/csrf-token`);
        const { csrfToken } = (await csrfRes.ok)
          ? await csrfRes.json()
          : { csrfToken: null };

        const sessionRes = await fetch(`${apiUrl}/users/me`, {
          credentials: 'include',
        });
        if (sessionRes.ok) {
          const { user } = await sessionRes.json();
          setAuthState(user, csrfToken);
        } else {
          setAuthState(null, csrfToken);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Failed to initialize session:', error);
          setAuthState(null, null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    initializeSession();
  }, [setAuthState]);

  if (isLoading) {
    return <div>Loading session...</div>;
  }
  return <>{children}</>;
}
