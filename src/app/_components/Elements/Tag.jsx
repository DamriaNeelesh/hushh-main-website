import Link from "next/link";
import React from "react";

const cx = (...classNames) => classNames.filter(Boolean).join(" ");

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      href={link}
      className={cx(
        "inline-block py-1 px-3 text-xs uppercase tracking-wide font-semibold bg-[#262626] text-white rounded-full transition-colors duration-300 hover:bg-[#363636]",
        props.className
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
