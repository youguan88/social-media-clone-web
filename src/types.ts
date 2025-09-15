export type Author = {
  id: number;
  email: string;
};

export type Post = {
  id: number;
  content: string;
  createdAt: string;
  author: Author;
};
