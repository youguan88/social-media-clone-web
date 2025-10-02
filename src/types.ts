export type User = {
  id: number;
  email: string;
};

export type Post = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
};
