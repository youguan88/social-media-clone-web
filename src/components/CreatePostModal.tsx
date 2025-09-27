'use client';

import { useAuthStore } from '@/store/auth.store';
import { Post } from '@/types';
import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (newPost: Post) => void;
};

export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: ModalProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token) {
      setError('You must be logged in to create a post.');
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create post');
      }
      const newPost: Post = await res.json();
      onPostCreated(newPost);
      setContent('');
      onClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error creating new post');
      }
    }
  };

  if (!isOpen) return null;
  const label = "What's on your mind";

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', padding: '1em' }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <h2>Create a New Post</h2>
          <div>
            <label htmlFor="postContent">{label}</label>
            <br />
            <textarea
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the world..."
              rows={5}
              cols={50}
              required
            />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create Post</button>
          </div>
        </form>
      </div>
    </div>
  );
}
