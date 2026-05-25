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
    }).catch((err) => {
      console.error("Failed to fetch blog posts:", err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="comic-panel">LOADING INTEL...</div>;

  return (
    <section>
      <h2 style={{ marginBottom: '2rem', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
        MISSION <span style={{ color: 'var(--c-accent)' }}>REPORTS</span> (BLOG)
      </h2>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {posts.map((post) => (
          <article key={post.id} className="comic-panel">
            {post.image_url && (
              <img
                src={`/legacy-static/${post.image_url}`}
                alt={post.title}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            )}
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
