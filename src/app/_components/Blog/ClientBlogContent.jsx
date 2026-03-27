"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import BlogDetails from "./BlogDetails";
import { formatContentDate } from "../../../lib/content/date-utils";

const ClientBlogContent = ({ blog, formattedDate, readingTime, isUpdate, articleContent }) => {
  const toast = useToast();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)) : 0;
      setProgress(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shareLinks = useMemo(() => {
    if (!url) return null;

    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(url)}`,
    };
  }, [blog.title, url]);

  const readingLabel =
    !readingTime
      ? "Quick read"
      : typeof readingTime === "string" && readingTime.toLowerCase().includes("read")
      ? readingTime
      : `${readingTime} read`;

  const derivedImageSrc = blog.image?.filePath
    ? blog.image.filePath.replace("../public", "")
    : "/blogs/blog2o.png";

  const copyArticleLink = async () => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Article URL copied to clipboard.",
        status: "success",
        duration: 1800,
        isClosable: true,
        position: "top",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please copy manually.",
        status: "error",
        duration: 2200,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <div className="blog-progress" style={{ width: `${progress}%` }} />

      <div className="blog-container pt-10 md:pt-14 pb-8">
        <Link href="/hushhBlogs" className="blog-link text-sm font-semibold">
          {"<"} Newsroom
        </Link>

        <header className="mt-5 md:mt-8 max-w-4xl">
          {isUpdate && blog.tags?.[0] ? <span className="blog-chip mb-4">{blog.tags[0]}</span> : null}

          <h1 className="mt-3 text-[2rem] font-bold leading-[1.06] tracking-[-0.02em] text-[#111827] md:text-[3rem] lg:text-[3.75rem]">
            {blog.title}
          </h1>

          {blog.description ? <p className="blog-subtitle mt-4">{blog.description}</p> : null}

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
            <span>{formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-[#9ca3af]" />
            <span>{readingLabel}</span>
            {blog.author ? (
              <>
                <span className="h-1 w-1 rounded-full bg-[#9ca3af]" />
                <span>{blog.author}</span>
              </>
            ) : null}
          </div>
        </header>

        <div className="blog-share-row mt-6 md:mt-8">
          <a
            className="blog-btn-secondary px-4 py-2 text-sm"
            href={shareLinks?.linkedin || "#"}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="blog-btn-secondary px-4 py-2 text-sm"
            href={shareLinks?.twitter || "#"}
            target="_blank"
            rel="noreferrer"
          >
            X
          </a>
          <a
            className="blog-btn-secondary px-4 py-2 text-sm"
            href={shareLinks?.facebook || "#"}
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a className="blog-btn-secondary px-4 py-2 text-sm" href={shareLinks?.email || "#"}>
            Email
          </a>
          <button
            type="button"
            className="blog-btn-secondary px-4 py-2 text-sm"
            onClick={copyArticleLink}
          >
            Copy Link
          </button>
        </div>

        <div className="blog-card mt-7 md:mt-9">
          <div className="blog-card-image">
            <Image
              src={derivedImageSrc}
              alt={blog.title}
              width={1400}
              height={787}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="blog-container pb-14 md:pb-20">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12 xl:gap-10">
          <article className="blog-article xl:col-span-8">{articleContent}</article>

          <aside className="xl:col-span-4">
            <div className="xl:sticky xl:top-24">
              <BlogDetails blog={blog} />
            </div>
          </aside>
        </div>
      </div>

      {blog.relatedPosts?.length > 0 ? (
        <section className="blog-container pb-16 md:pb-20">
          <h2 className="blog-section-title mb-5">More to Explore</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
            {blog.relatedPosts.map((post) => (
              <article key={post.slug} className="blog-card flex h-full flex-col">
                <Link href={post.slug} className="blog-card-image block">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  {post.date ? <span className="blog-meta mb-2">{formatContentDate(post.date)}</span> : null}
                  <Link href={post.slug} className="group">
                    <h3 className="blog-clamp-2 text-[1.08rem] font-semibold leading-6 tracking-[-0.01em] text-[#111827] transition-colors group-hover:text-[#0056b3]">
                      {post.title}
                    </h3>
                  </Link>
                  {post.description ? (
                    <p className="blog-clamp-3 mt-3 text-sm leading-6 text-[#4b5563]">
                      {post.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ClientBlogContent;
