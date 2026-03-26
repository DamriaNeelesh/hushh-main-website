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
      const nextProgress = scrollHeight > 0 ? Math.min(100, Math.max(0, scrollTop / scrollHeight * 100)) : 0;
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
      email: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(url)}`
    };
  }, [blog.title, url]);

  const readingLabel =
  !readingTime ?
  "Quick read" :
  typeof readingTime === "string" && readingTime.toLowerCase().includes("read") ?
  readingTime :
  `${readingTime} read`;
  const derivedImageSrc = blog.image?.filePath ? blog.image.filePath.replace("../public", "") : "/blogs/blog2o.png";

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
        position: "top"
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please copy manually.",
        status: "error",
        duration: 2200,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <>
      <div className="blog-theme blog-page-shell">
        <div className="blog-progress" style={{ width: `${progress}%` }} />

        <div className="blog-container pt-10 md:pt-14 pb-8">
          <Link href="/hushhBlogs" className="blog-link text-sm font-semibold">
            {"<"} Newsroom
          </Link>

          <header className="mt-5 md:mt-8 max-w-4xl">
            {isUpdate && blog.tags?.[0] && <span className="blog-chip mb-4">{blog.tags[0]}</span>}

            <h1 className="text-[2rem] md:text-[3rem] lg:text-[3.75rem] font-bold leading-[1.06] tracking-[-0.02em] text-[#111827] mt-3">
              {blog.title}
            </h1>

            {blog.description && <p className="blog-subtitle mt-4">{blog.description}</p>}

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#6b7280]">
              <span>{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
              <span>{readingLabel}</span>
              {blog.author &&
              <>
                  <span className="w-1 h-1 rounded-full bg-[#9ca3af]" />
                  <span>{blog.author}</span>
                </>
              }
            </div>
          </header>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-2">
            <a
              className="blog-btn-secondary px-4 py-2 text-sm"
              href={shareLinks?.linkedin || "#"}
              target="_blank"
              rel="noreferrer">
              
              LinkedIn
            </a>
            <a
              className="blog-btn-secondary px-4 py-2 text-sm"
              href={shareLinks?.twitter || "#"}
              target="_blank"
              rel="noreferrer">
              
              X
            </a>
            <a
              className="blog-btn-secondary px-4 py-2 text-sm"
              href={shareLinks?.facebook || "#"}
              target="_blank"
              rel="noreferrer">
              
              Facebook
            </a>
            <a className="blog-btn-secondary px-4 py-2 text-sm" href={shareLinks?.email || "#"}>
              Email
            </a>
            <button type="button" className="blog-btn-secondary px-4 py-2 text-sm" onClick={copyArticleLink}>
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
                className="w-full h-full object-cover"
                priority />
              
            </div>
          </div>
        </div>

        <div className="blog-container pb-14 md:pb-20">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-10">
            <article className="xl:col-span-8 blog-article">
              {articleContent}
            </article>

            <aside className="xl:col-span-4">
              <div className="xl:sticky xl:top-24">
                <BlogDetails blog={blog} />
              </div>
            </aside>
          </div>
        </div>

        {blog.relatedPosts?.length > 0 &&
        <section className="blog-container pb-16 md:pb-20">
            <h2 className="blog-section-title mb-5">More to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {blog.relatedPosts.map((post) =>
            <article key={post.slug} className="blog-card h-full flex flex-col">
                  <Link href={post.slug} className="blog-card-image block">
                    <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    {post.date && <span className="blog-meta mb-2">{formatContentDate(post.date)}</span>}
                    <Link href={post.slug} className="group">
                      <h3 className="text-[1.08rem] font-semibold leading-6 tracking-[-0.01em] text-[#111827] group-hover:text-[#0056b3] transition-colors blog-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    {post.description && <p className="mt-3 text-sm leading-6 text-[#4b5563] blog-clamp-3">{post.description}</p>}
                  </div>
                </article>
            )}
            </div>
          </section>
        }
      </div>
    </>);

};

export default ClientBlogContent;
