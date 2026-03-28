import Link from "next/link";
import Image from "next/image";
import { sortBlogs } from "../../utils";
import { FALLBACK_IMAGE } from "../Blog/constants";
import { formatContentDate } from "../../../lib/content/date-utils";
import { MotionSection, MotionStaggerGroup, MotionStaggerItem } from "../motion/SectionReveal";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs([...(blogs || [])]);
  const featuredBlogs = sortedBlogs.slice(1, 7);

  if (!featuredBlogs.length) return null;

  return (
    <MotionSection as="section" family="marketing" className="blog-container pb-10 md:pb-12" delay={0.08}>
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="blog-section-title">Featured Insights</h2>
      </div>

      <MotionStaggerGroup family="marketing" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {featuredBlogs.map((blog) => {
          const publishedAt = formatContentDate(blog.publishedAt);
          const imagePath = blog.image?.filePath ? blog.image.filePath.replace("../public", "") : FALLBACK_IMAGE;

          return (
            <MotionStaggerItem as="article" family="marketing" key={blog._id} className="blog-card h-full flex flex-col">
              <Link href={blog.url} className="blog-card-image block">
                <Image
                  src={imagePath}
                  alt={blog.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </Link>

              <div className="p-5 md:p-6 flex flex-col flex-1">
                {blog.tags?.[0] && <span className="blog-chip mb-3 w-fit">{blog.tags[0]}</span>}

                <Link href={blog.url} className="group">
                  <h3 className="text-[1.1rem] md:text-[1.25rem] font-semibold leading-6 md:leading-7 tracking-[-0.01em] text-[#111827] group-hover:text-[#0056b3] transition-colors blog-clamp-2">
                    {blog.title}
                  </h3>
                </Link>

                {blog.description && (
                  <p className="mt-3 text-[0.95rem] leading-6 text-[#4b5563] blog-clamp-3">{blog.description}</p>
                )}

                <span className="mt-auto pt-4 blog-meta">{publishedAt}</span>
              </div>
            </MotionStaggerItem>
          );
        })}
      </MotionStaggerGroup>
    </MotionSection>
  );
};

export default FeaturedPosts;
