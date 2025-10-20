import PostCard from '@/components/PostCard';
import UserProfile from '@/components/UserProfile';
import { Post, UserProfilePayload } from '@/types';
import { cookies } from 'next/headers';

const apiUrl = process.env.INTERNAL_API_URL;

async function getUserProfile(username: string): Promise<UserProfilePayload> {
  const cookieStore = await cookies();
  const res = await fetch(`${apiUrl}/users/${username}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('User not found.');
  return res.json();
}

async function getUserPosts(username: string): Promise<Post[]> {
  const res = await fetch(`${apiUrl}/posts/by/${username}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Could not fetch posts');
  return res.json();
}

type UserProfilePageProps = {
  params: {
    username: string;
  };
};

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { username } = await params;
  try {
    const [user, posts] = await Promise.all([
      getUserProfile(username),
      getUserPosts(username),
    ]);
    const emptyPost = `This user hasn't posted anything yet.`;
    return (
      <main>
        <UserProfile user={user} />
        <hr />
        <section>
          <h3>Posts by {username}</h3>
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>{emptyPost}</p>
          )}
        </section>
      </main>
    );
  } catch (error) {
    console.error('Failed to load user profile page:', error);
    return <div>User not found.</div>;
  }
}
