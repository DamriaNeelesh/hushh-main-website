"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sortBlogs } from "../../utils";
import { FALLBACK_IMAGE } from "../Blog/constants";
import { formatContentDate } from "../../../lib/content/date-utils";

const RecentPosts = ({ blogs = [] }) => {
  const router = useRouter();
  const [displayCount, setDisplayCount] = useState(8);

  const sortedBlogs = useMemo(() => sortBlogs([...(blogs || [])]), [blogs]);
  const isLimitedSet = sortedBlogs.length <= 3;
  const displayedBlogs = isLimitedSet ? sortedBlogs : sortedBlogs.slice(0, displayCount);

  if (!sortedBlogs.length) return null;

  return (
    <section className="blog-container pb-16 md:pb-20">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="blog-section-title">{isLimitedSet ? "Related Articles" : "More News"}</h2>
        {!isLimitedSet && (
          <button
            type="button"
            onClick={() => router.push("/categories/all")}
            className="blog-link text-sm font-semibold"
          >
            See all topics
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {displayedBlogs.map((blog) => {
          const publishedAt = formatContentDate(blog.publishedAt);
          const imagePath = blog.image?.filePath ? blog.image.filePath.replace("../public", "") : FALLBACK_IMAGE;

          return (
            <article key={blog._id} className="blog-card h-full flex flex-col">
              <Link href={blog.url} className="blog-card-image block">
                <Image
                  src={imagePath}
                  alt={blog.title}
                  width={700}
                  height={394}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              </Link>

              <div className="p-4 md:p-5 flex flex-col flex-1">
                {blog.tags?.[0] && <span className="blog-chip mb-3 w-fit">{blog.tags[0]}</span>}

                <Link href={blog.url} className="group">
                  <h3 className="text-[1rem] md:text-[1.05rem] font-semibold leading-6 tracking-[-0.01em] text-[#111827] group-hover:text-[#0056b3] transition-colors blog-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                {blog.description && (
                  <p className="mt-2 text-sm leading-6 text-[#4b5563] blog-clamp-2">{blog.description}</p>
                )}

                <span className="mt-auto pt-3 blog-meta">{publishedAt}</span>
              </div>
            </article>
          );
        })}
      </div>

      {!isLimitedSet && displayCount < sortedBlogs.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setDisplayCount((prev) => prev + 8)}
            className="blog-btn-primary px-6 py-3 text-sm md:text-base"
          >
            Load More Articles
          </button>
        </div>
      )}
    </section>
  );
};

export default RecentPosts;
