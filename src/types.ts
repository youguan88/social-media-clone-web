export type User = {
  id: number;
  username: string;
  email: string;
};

export type UserProfilePayload = {
  id: number;
  username: string;
  isFollowing: boolean;
  _count: {
    followers: number;
    following: number;
  };
};

export type Post = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};
