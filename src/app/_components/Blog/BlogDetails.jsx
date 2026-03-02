"use client";

import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { slug } from "github-slugger";

const BlogDetails = ({ blog }) => {
  if (!blog) return null;

  const category = blog.tags?.[0];

  return (
    <div className="blog-card p-5 md:p-6 bg-[#ffffff]">
      <h3 className="text-lg font-semibold tracking-[-0.01em] text-[#111827]">Article Information</h3>

      <dl className="mt-5 space-y-4">
        {blog.publishedAt && (
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-[#6b7280] font-semibold">Published</dt>
            <dd className="mt-1 text-sm text-[#111827]">{format(parseISO(blog.publishedAt), "MMMM d, yyyy")}</dd>
          </div>
        )}

        {blog.author && (
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-[#6b7280] font-semibold">Author</dt>
            <dd className="mt-1 text-sm text-[#111827]">{blog.author}</dd>
          </div>
        )}

        {blog.readingTime?.text && (
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-[#6b7280] font-semibold">Reading Time</dt>
            <dd className="mt-1 text-sm text-[#111827]">{blog.readingTime.text}</dd>
          </div>
        )}

        {category && (
          <div>
            <dt className="text-xs uppercase tracking-[0.08em] text-[#6b7280] font-semibold">Category</dt>
            <dd className="mt-1">
              <Link href={`/categories/${slug(category)}`} className="blog-link text-sm font-semibold">
                {category}
              </Link>
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};

export default BlogDetails;
