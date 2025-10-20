import { Post } from '@/types';
import Link from 'next/link';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article>
      <p>{post.content}</p>
      <footer>
        <small>
          Posted by:
          <Link href={`/users/${post.author.username}`}>
            {' '}
            {post.author.username}
          </Link>
        </small>
      </footer>
    </article>
  );
}
