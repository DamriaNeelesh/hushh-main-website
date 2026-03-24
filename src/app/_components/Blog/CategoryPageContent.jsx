"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Categories from "./Categories";
import { formatContentDate } from "../../../lib/content/date-utils";

const FALLBACK_IMAGE = "/blogs/blog2o.png";

const CategoryPageContent = ({ blogs = [], allCategories = [], params, categoryName }) => {
  return (
    <main className="blog-theme blog-page-shell">
      <section className="blog-container pt-10 md:pt-14 pb-8">
        <Link href="/hushhBlogs" className="blog-link text-sm font-semibold">
          {"<"} Newsroom
        </Link>

        <div className="mt-5 md:mt-7 max-w-4xl">
          <p className="blog-kicker blog-gradient-text">Category</p>
          <h1 className="blog-title mt-3">{categoryName}</h1>
          <p className="blog-subtitle mt-4">
            {params.slug === "all"
              ? "Browse all stories from the Hushh Newsroom."
              : `Explore posts focused on ${categoryName}.`}
          </p>
        </div>
      </section>

      <section className="blog-container pb-6">
        <Categories categories={allCategories} currentSlug={params.slug} />
      </section>

      <section className="blog-container pb-16 md:pb-20">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {blogs.map((blog) => {
              const imagePath = blog.image?.filePath ? blog.image.filePath.replace("../public", "") : FALLBACK_IMAGE;
              const publishedAt = formatContentDate(blog.publishedAt);

              return (
                <article key={blog._id} className="blog-card h-full flex flex-col">
                  <Link href={blog.url} className="blog-card-image block">
                    <Image
                      src={imagePath}
                      alt={blog.title}
                      width={900}
                      height={506}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="p-5 flex flex-col flex-1">
                    {blog.tags?.[0] && <span className="blog-chip mb-3 w-fit">{blog.tags[0]}</span>}
                    <Link href={blog.url} className="group">
                      <h3 className="text-[1.1rem] font-semibold leading-6 tracking-[-0.01em] text-[#111827] group-hover:text-[#0056b3] transition-colors blog-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>
                    {blog.description && <p className="mt-3 text-sm leading-6 text-[#4b5563] blog-clamp-3">{blog.description}</p>}
                    <span className="mt-auto pt-4 blog-meta">{publishedAt}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="blog-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-[#111827]">No articles yet</h2>
            <p className="text-[#6b7280] mt-3">We are publishing new content for this category soon.</p>
            <Link href="/hushhBlogs" className="blog-btn-primary inline-flex mt-6 px-5 py-3 text-sm">
              Back to Newsroom
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default CategoryPageContent;
