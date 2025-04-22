'use client';
import { cx } from "../../utils";
import Link from "next/link";
import React from "react";

const Category = ({ link = "#", name, active, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-1.5 px-4 rounded-full text-sm font-medium transition-colors duration-300 mr-3 mb-3",
        props.className,
        active 
          ? "bg-white text-black" 
          : "bg-[#262626] text-white hover:bg-[#363636]"
      )}
    >
      {name}
    </Link>
  );
};

export default Category;
