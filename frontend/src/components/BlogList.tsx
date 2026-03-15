import React, { useState, useEffect } from 'react';
import { fetchBlogPosts } from '../api.ts';
import type { BlogPost as BlogPostType } from '../api.ts';
import { Link } from 'react-router-dom';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="comic-panel">LOADING INTEL...</div>;

  return (
    <section>
      <h2 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>
        MISSION <span style={{ color: 'var(--c-accent)' }}>REPORTS</span> (BLOG)
      </h2>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {posts.map((post) => (
          <article key={post.id} className="comic-panel">
            <h3>{post.title}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--c-grey-dark)', marginBottom: '1rem' }}>
              FILED ON: {new Date(post.published_at).toLocaleDateString()}
            </p>
            <p style={{ marginBottom: '1.5rem' }}>{post.excerpt || "Click to read the full briefing..."}</p>
            <Link to={`/blog/${post.slug}`} className="comic-btn" style={{ fontSize: '0.9rem' }}>
              READ FULL BRIEFING -&gt;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
