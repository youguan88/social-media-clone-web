'use client';

import { useAuthGuard } from '@/hooks/useAuthGuard';

export default function SettingsPage() {
  useAuthGuard();

  return (
    <main>
      <h1>Your Settings</h1>
      <p>Here you can change your password. This page is private to you.</p>
    </main>
  );
}
