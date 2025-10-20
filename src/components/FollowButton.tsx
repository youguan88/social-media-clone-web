'use client';

type FollowButtonProps = {
  isFollowing: boolean;
  onClick: () => void;
  isLoading: boolean;
};

export default function FollowButton({
  isFollowing,
  onClick,
  isLoading,
}: FollowButtonProps) {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
}
