type PostCardProps = {
  content: string;
  authorEmail: string;
};

export default function PostCard({ content, authorEmail }: PostCardProps) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        margin: '16px 0',
        backgroundColor: '#f9f9f9',
      }}
    >
      <p style={{ margin: 0, paddingBottom: '8px' }}>{content}</p>
      <small style={{ color: '#555' }}>Posted by: {authorEmail}</small>
    </div>
  );
}
