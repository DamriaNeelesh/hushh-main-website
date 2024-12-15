import React from "react";
import Tag from "../Elements/Tag";
import Link from "next/link";
import Image from "next/image";
import { slug } from "github-slugger";

const truncateDescription = (description) => {
  const words = description.split(" ");
  if (words.length > 10) {
    return words.slice(0, 10).join(" ") + '...';
  }
  return description;
}

const BlogLayoutOne = ({ blog }) => {

  return (
    <div className="group inline-block overflow-hidden rounded-xl relative">
      <div style={{ '--tw-gradient-to': 'rgba(27, 27, 27, .9)'}}  
           className='absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent from-0% rounded-xl z-0'/>
      <Image
        src={blog.image.filePath.replace("../public", "")}
        placeholder="blur"
        blurDataURL={blog.image.blurhashDataUrl}
        alt={blog.title}
        width={blog.image.width}
        height={blog.image.height}
        className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300"
        sizes="(max-width: 1180px) 100vw, 50vw"
      />

      <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20" style={{ '--tw-gradient-to': 'rgba(27, 27, 27, .9)' }}>
        <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]}
        className="px-6 text-xs  sm:text-sm py-1 sm:py-2 !border "
        />
        <Link href={blog.url} className="mt-6">
          <h2 className="font-bold blogLayoutOneTitle capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-white mt-2 sm:mt-4">
            <span
              className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog.title}
            </span>
           <br></br>
            <p
              className="font-light text-lg sm:text-md xs:text-xs"
            >
              {truncateDescription(blog.description)}
            </p>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default BlogLayoutOne;
