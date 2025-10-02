import { create } from 'zustand';
import { User } from '@/types';

type AuthState = {
  user: User | null;
  csrfToken: string | null;
  setAuthState: (user: User | null, csrfToken: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  csrfToken: null,
  setAuthState: (user, csrfToken) => set({ user, csrfToken }),
}));
