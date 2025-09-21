import PostCard from './PostCard';
import { Post } from '@/types';

async function getPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/posts`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts from the API');
  }
  return res.json();
}

export default async function PostFeed() {
  const posts = await getPosts();
  return (
    <div>
      <h2 style={{ color: '#333' }}>Recent Posts</h2>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          content={post.content}
          authorEmail={post.author.email}
        />
      ))}
    </div>
  );
}
