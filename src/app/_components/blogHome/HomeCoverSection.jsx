"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { sortBlogs } from "../../utils";

const FALLBACK_IMAGE = "/blogs/blog2o.png";

const HomeCoverSection = ({ blogs }) => {
  const sortedBlogs = sortBlogs([...(blogs || [])]);
  const blog = sortedBlogs[0];

  if (!blog) return null;

  const publishedAt = blog.publishedAt ? format(new Date(blog.publishedAt), "d MMM yyyy") : "Recent post";
  const imagePath = blog.image?.filePath ? blog.image.filePath.replace("../public", "") : FALLBACK_IMAGE;

  return (
    <section className="blog-container pb-8 md:pb-12">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="blog-section-title">Latest Story</h2>
      </div>

      <article className="blog-card">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <Link href={blog.url} className="blog-card-image lg:col-span-3 block">
            <Image
              src={imagePath}
              alt={blog.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </Link>

          <div className="lg:col-span-2 p-5 md:p-7 flex flex-col">
            {blog.tags?.[0] && <span className="blog-chip mb-3">{blog.tags[0]}</span>}

            <Link href={blog.url} className="group">
              <h3 className="text-[1.35rem] md:text-[1.85rem] font-bold leading-tight tracking-[-0.01em] text-[#111827] group-hover:text-[#0056b3] transition-colors">
                {blog.title}
              </h3>
            </Link>

            {blog.description && (
              <p className="mt-3 text-[0.98rem] leading-7 text-[#4b5563] blog-clamp-3">{blog.description}</p>
            )}

            <div className="mt-auto pt-5 flex items-center gap-3 text-sm text-[#6b7280]">
              <span>{publishedAt}</span>
              <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
              <span className="blog-link">Read article</span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default HomeCoverSection;
