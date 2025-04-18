'use client';
import { slug } from "github-slugger";
import React from "react";
import Category from "./Category";

const Categories = ({ categories, currentSlug }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-0 py-6 flex flex-wrap items-center">
      <span className="text-[#98989A] mr-4 font-medium text-sm">Filter by category:</span>
      <div className="flex flex-wrap">
        <Category
          key="all"
          link="/categories/all"
          name="All"
          active={currentSlug === "all"}
        />
        {categories.map((cat) => (
          <Category
            key={cat}
            link={`/categories/${slug(cat)}`}
            name={cat}
            active={currentSlug === slug(cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
