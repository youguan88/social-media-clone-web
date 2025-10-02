import { Post } from '@/types';
import HomeClient from './HomeClient';

async function getPosts(): Promise<Post[]> {
  const apiUrl = process.env.INTERNAL_API_URL;
  const res = await fetch(`${apiUrl}/posts`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts from the API');
  }
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();
  return <HomeClient initialPosts={posts} />;
}
