 
import React from "react";
import { allBlogSummaries } from "../../../lib/content/blog-registry";
import GithubSlugger, { slug } from "github-slugger";
import ContactForm from "src/app/_components/features/contactForm";
import CategoryPageContent from "../../_components/Blog/CategoryPageContent";
import ContentWrapper from "../../_components/layout/ContentWrapper";
import { buildPageMetadata } from "../../../lib/seo/pageMetadata";

const slugger = new GithubSlugger();
export const revalidate = 3600;

function getSafeTags(blog) {
  if (!Array.isArray(blog?.tags)) {
    return [];
  }

  return blog.tags
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function formatCategoryName(slugValue) {
  if (slugValue === "all") {
    return "All Topics";
  }

  if (typeof slugValue !== "string" || !slugValue.trim()) {
    return "Category";
  }

  return slugValue
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];

  allBlogSummaries.forEach((blog) => {
    if (blog.isPublished) {
      getSafeTags(blog).forEach((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug: categorySlug } = await params;
  const categoryName = formatCategoryName(categorySlug);

  return buildPageMetadata({
    title: `${categoryName} | Hushh Newsroom`,
    description: `Explore our latest articles about ${
      categorySlug === "all" ? "all topics" : String(categorySlug || "this category").replace(/-/g, " ")
    }.`,
    pathname: `/categories/${categorySlug}`,
    keywords: ["Hushh Newsroom", "Category", categoryName],
  });
}

const CategoryPage = async ({ params }) => {
  const resolvedParams = await params;
  // Create list of categories from all blogs
  const allCategories = ["all"];
  allBlogSummaries.forEach((blog) => {
    getSafeTags(blog).forEach((tag) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
    });
  });

  // Sort categories alphabetically
  allCategories.sort();

  // Filter blogs based on the current category
  const blogs = allBlogSummaries.filter((blog) => {
    if (resolvedParams.slug === "all") {
      return true;
    }
    return getSafeTags(blog).some((tag) => slug(tag) === resolvedParams.slug);
  });

  // Format category name for display
  const categoryName = formatCategoryName(resolvedParams?.slug);

  return (
    <ContentWrapper>
      <CategoryPageContent
        blogs={blogs}
        allCategories={allCategories}
        params={resolvedParams}
        categoryName={categoryName}
      />
      <ContactForm />
    </ContentWrapper>
  );
};

export default CategoryPage;
