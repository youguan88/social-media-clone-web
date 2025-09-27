'use client';

import { useState } from 'react';
import { Post } from '@/types';
import CreatePostModal from '@/components/CreatePostModal';
import PostCard from '@/components/PostCard';
import { useAuthStore } from '@/store/auth.store';

type HomeClientProps = {
  initialPosts: Post[];
};

export default function HomeClient({ initialPosts }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const { token } = useAuthStore();

  const handlePostCreated = (newPost: Post) => {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };

  return (
    <main>
      <header>
        <h1>Home Feed</h1>
        {token && (
          <button onClick={() => setIsModalOpen(true)}>Create Post</button>
        )}
      </header>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />

      <section>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            content={post.content}
            authorEmail={post.author.email}
          />
        ))}
      </section>
    </main>
  );
}
