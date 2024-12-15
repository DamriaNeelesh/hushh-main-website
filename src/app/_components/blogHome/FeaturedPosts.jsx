import { sortBlogs } from "../../utils";
import React from "react";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);

  return (
    <section  className="w-full mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block gradient font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
        Featured Posts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 sm:mt-16">
        <article className="relative col-span-1 sm:col-span-1">
          <BlogLayoutOne blog={sortedBlogs[1]}/>
        </article>
        <div className="flex flex-col gap-6">
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[2]}/>
          </article>
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[3]}/>
          </article>
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[4]} />
          </article>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-50 sm:mt-16">
        <div className="flex flex-col gap-6">
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[5]} />
          </article>
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[6]} />
          </article>
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[7]} />
          </article>
        </div>
        <article className="relative col-span-1 sm:col-span-1">
          <BlogLayoutOne blog={sortedBlogs[4]} />
        </article>  
      </div>
    </section>
  );
};

export default FeaturedPosts;
