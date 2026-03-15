import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPostBySlug } from '../api.ts';
import type { BlogPost } from '../api.ts';

const BlogPostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogPostBySlug(slug).then((data) => {
        setPost(data);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="comic-panel">DECODING MISSION DATA...</div>;
  if (!post) return <div className="comic-panel">MISSION REPORT NOT FOUND! <Link to="/blog">BACK TO ARCHIVES</Link></div>;

  return (
    <article className="comic-panel">
      <Link to="/blog" className="comic-btn" style={{ fontSize: '0.8rem', marginBottom: '2rem' }}>
        &lt;- BACK TO INTEL
      </Link>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', marginTop: '1rem' }}>{post.title}</h1>
      <p style={{ fontSize: '0.9rem', color: 'var(--c-accent)', fontWeight: 'bold', marginBottom: '2rem' }}>
        FILED ON: {new Date(post.published_at).toLocaleDateString()}
      </p>

      {/* Render the legacy HTML content */}
      <div 
        className="blog-content" 
        dangerouslySetInnerHTML={{ __html: post.content }} 
        style={{ lineHeight: '1.6', fontSize: '1.1rem' }}
      />
    </article>
  );
};

export default BlogPostView;
