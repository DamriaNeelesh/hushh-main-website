"use client";

import React from "react";
import Link from "next/link";

const Category = ({ link = "#", name, active }) => {
  const label =
    typeof name === "string"
      ? name
          .split("-")
          .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
          .join(" ")
      : name;

  return (
    <Link
      href={link}
      className={[
        "inline-flex items-center px-4 py-2 rounded-full border text-sm font-semibold transition-colors duration-200",
        active
          ? "bg-[#0071e3] border-[#0071e3] text-white"
          : "bg-white border-[#dbeafe] text-[#1d4ed8] hover:bg-[#eff6ff]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

export default Category;
