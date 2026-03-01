"use client";

import React from "react";
import { slug } from "github-slugger";
import Category from "./Category";

const Categories = ({ categories = [], currentSlug }) => {
  const normalizedCategories = categories.filter((cat) => cat !== "all");

  return (
    <div className="blog-card p-4 md:p-5">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7280]">Filter by category</span>

        <div className="flex flex-wrap gap-2">
          <Category link="/categories/all" name="All" active={currentSlug === "all"} />
          {normalizedCategories.map((cat) => {
            const slugged = slug(cat);
            return <Category key={slugged} link={`/categories/${slugged}`} name={cat} active={currentSlug === slugged} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
