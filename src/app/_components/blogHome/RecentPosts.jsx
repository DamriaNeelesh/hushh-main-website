'use client'
import { sortBlogs } from "../../utils";
import Link from "next/link";
import React from "react";
import BlogLayoutThree from "../Blog/BlogLayoutThree";
import { Box, Text } from "@chakra-ui/react";
import ArrowIcon from '../../_components/svg/icons/yellowArrow.svg'
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecentPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);
  const router =  useRouter();
  return (
    <section className="w-full  mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <div className="w-full flex  justify-between">
        <h2 className="w-fit gradient inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
          Recent Posts
        </h2>
        <Box
          href="/categories/all"
          p={'15px'}
          background={'#262626'}
          border='1px solid #262626'
          padding='15px'
          borderRadius={'10px'}
          cursor={'pointer'}
        >
          <Text onClick={()=> router.push('/categories/all')} color="#98989A" gap={'2'} display={'flex'}>View All Blogs <Image src={ArrowIcon} alt="ArrowYellowIcon"/> </Text>
        </Box>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {sortedBlogs.slice(4, 13).map((blog, index) => {
          return (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
