import { blogContentComponents } from "../../../lib/content/blog-content-components";

export default function RenderContent({ blog }) {
  const BlogContent = blog?.Content;

  if (!BlogContent) {
    return <p className="text-[#b91c1c]">This article content is not available right now.</p>;
  }

  return (
    <div className="blog-article">
      <BlogContent components={blogContentComponents} />
    </div>
  );
}
