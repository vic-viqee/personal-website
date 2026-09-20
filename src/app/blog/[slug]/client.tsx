"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { fetchBlogPostBySlug } from "@/lib/api";
import { resolveImageUrl } from "@/lib/image";
import type { BlogPost } from "@/lib/api";

export default function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogPostBySlug(slug)
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  return (
    <SiteShell>
      {loading ? (
        <div className="comic-panel">DECODING MISSION DATA...</div>
      ) : !post ? (
        <div className="comic-panel">
          MISSION REPORT NOT FOUND! <Link href="/blog">BACK TO ARCHIVES</Link>
        </div>
      ) : (
        <article className="comic-panel">
          <Link href="/blog" className="comic-btn" style={{ fontSize: "0.8rem", marginBottom: "2rem", display: "inline-block" }}>
            &lt;- BACK TO INTEL
          </Link>

          {resolveImageUrl(post.image_url) && (
            <img
              src={resolveImageUrl(post.image_url) as string}
              alt={post.title}
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "4px", marginBottom: "1.5rem", marginTop: "1.5rem" }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <h1 style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)", marginBottom: "1rem", marginTop: "1rem" }}>{post.title}</h1>
          <p style={{ fontSize: "0.9rem", color: "var(--c-accent)", fontWeight: "bold", marginBottom: "2rem" }}>
            FILED ON: {new Date(post.published_at).toLocaleDateString()}
          </p>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ lineHeight: "1.6", fontSize: "1.1rem" }}
          />
        </article>
      )}
    </SiteShell>
  );
}