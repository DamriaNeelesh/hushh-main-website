/* eslint-disable react/prop-types */
import React from "react";
import { allBlogs } from "contentlayer/generated";
import GithubSlugger, { slug } from "github-slugger";
import ContactForm from "src/app/_components/features/contactForm";
import CategoryPageContent from "../../_components/Blog/CategoryPageContent";
import ContentWrapper from "../../_components/layout/ContentWrapper";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];

  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags.forEach((tag) => {
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
  const categoryName = params.slug === "all" 
    ? "All Topics" 
    : params.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    
  return {
    title: `${categoryName} - Hushh Newsroom`,
    description: `Explore our latest articles about ${params.slug === "all" ? "all topics" : params.slug.replace(/-/g, " ")}`,
    openGraph: {
      title: `${categoryName} - Hushh Newsroom`,
      description: `Explore our latest articles about ${params.slug === "all" ? "all topics" : params.slug.replace(/-/g, " ")}`,
      type: 'website',
    },
  };
}

const CategoryPage = ({ params }) => {
  // Create list of categories from all blogs
  const allCategories = ["all"]; 
  allBlogs.forEach(blog => {
    blog.tags.forEach(tag => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
    });
  });

  // Sort categories alphabetically
  allCategories.sort();

  // Filter blogs based on the current category
  const blogs = allBlogs.filter(blog => {
    if (params.slug === "all") {
      return true;
    }
    return blog.tags.some(tag => slug(tag) === params.slug);
  });

  // Format category name for display
  const categoryName = params.slug === "all" 
    ? "All Topics" 
    : params.slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <>
    <ContentWrapper>
      <CategoryPageContent 
        blogs={blogs}
        allCategories={allCategories}
        params={params}
        categoryName={categoryName}
      />
      <ContactForm />
      </ContentWrapper>
    </>
  );
};

export default CategoryPage;
