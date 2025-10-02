import { useAuthStore } from '@/store/auth.store';

const getAuthState = () => useAuthStore.getState();

export const apiClient = {
  async post<T>(path: string, body: object): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },
  async request<T>(path: string, options: RequestInit): Promise<T> {
    const { csrfToken } = getAuthState();
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (
      options.method &&
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method)
    ) {
      if (csrfToken) {
        headers.set('X-CSRF-TOKEN', csrfToken);
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `API request failed with status ${res.status}`,
      );
    }

    if (res.status == 204) {
      return {} as T;
    }

    return res.json();
  },
};
