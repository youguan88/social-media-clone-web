import { Suspense } from 'react';
import PostFeed from '@/components/PostFeed';

export default function Home() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Our Social Media App!!!</h1>
      <Suspense fallback={<p>Loading posts...</p>}>
        <PostFeed />
      </Suspense>
    </main>
  );
}
