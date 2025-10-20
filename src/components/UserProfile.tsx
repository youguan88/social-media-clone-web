'use client';

import { useAuthStore } from '@/store/auth.store';
import FollowButton from './FollowButton';
import { apiClient } from '@/lib/apiClient';
import { useState } from 'react';
import { UserProfilePayload } from '@/types';

type UserProfileProps = {
  user: UserProfilePayload;
};

export default function UserProfile({ user }: UserProfileProps) {
  const { user: currentUser } = useAuthStore();
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const [followerCount, setFollowerCount] = useState(user._count.followers);

  const handleClick = async () => {
    setIsLoading(true);
    const action = isFollowing ? 'delete' : 'post';
    const path = `/users/${user.id}/follow`;
    setFollowerCount((prevCount: number) =>
      isFollowing ? prevCount - 1 : prevCount + 1,
    );
    setIsFollowing(!isFollowing);

    try {
      await apiClient[action](path, {});
    } catch (error) {
      console.error('Action failed:', error);
      setFollowerCount((prevCount: number) =>
        isFollowing ? prevCount - 1 : prevCount + 1,
      );
      setIsFollowing(!isFollowing);
    } finally {
      setIsLoading(false);
    }
  };

  const canFollow = currentUser && currentUser.id !== user.id;

  return (
    <header>
      <h2>{user.username}</h2>
      <div>
        <span>Followers: {followerCount}</span>
        <span style={{ marginLeft: '1rem' }}>
          Following: {user._count.following}
        </span>
      </div>
      {canFollow && (
        <FollowButton
          isFollowing={isFollowing}
          onClick={handleClick}
          isLoading={isLoading}
        />
      )}
    </header>
  );
}
