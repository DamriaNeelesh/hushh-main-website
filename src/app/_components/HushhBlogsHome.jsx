'use client'
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Apporv from "../_components/svg/aboutImages/TeamImages/ApoorvBedmutha.svg";
import PythonEng from "../../../public/blogs/python_Eng_with_hushh.png";
import { useRouter } from "next/navigation";
import DiscoverFashion from '../../../public/blogs/discoveryFashion1.png'
import WalletBlog from "../../../public/blogs/hushhwalletBlog.png"
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import BlogImage from '../../../public/blogs/blog2o.png'

export const HushhBlogsHome = () => {
    const router = useRouter();
    const [topBlogs, setTopBlogs] = useState([]);
    
    useEffect(() => {
    // Sort blogs by updatedAt or publishedAt
    console.log('All blogs',allBlogs)
    const sortedBlogs = allBlogs
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 3); // Get top 3 blogs
    setTopBlogs(sortedBlogs);
  }, []);
  console.log('All blogs',allBlogs)

  return (
    <>
      <Container
        mt={{ base: "4rem", md: "8rem" }}
        display="flex"
        alignItems="center"
        mb={{md:'1rem',base:'2rem'}}
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "column" }}
        minW={"100%"}
        textAlign={'flex-start'}
      >
      <Box display={'flex'} px={{ md: "10rem", base: "2rem" }} flexDirection={'row'}> 
        <Text 
          display={'flex'}
          textAlign={'flex-start'}
          fontWeight={"700"}
          className="gradient"
          fontSize={{ md: "3.75rem", base: "1.75rem" }}
        >
          Browse our latest blogs 
        </Text>
        
    </Box>   
   
        <Flex mb={{md:'2rem',base:'1rem'}} justify="center" align="center" minHeight="40vh" padding="4">
          <Flex wrap="wrap" justify="center" gap="6">
           {topBlogs.map((blog) => (
          <Box
            key={blog.slug}
            maxW="sm"
            borderRadius="2.5rem"
            overflow="hidden"
            bg={"#1C1C1C"}
            cursor={"pointer"}
            onClick={() => router.push(`${blog.url}`)}
          >
            <Image
              src={BlogImage}
              alt={blog.title}
              style={{ width: "382", height: "300px" }}
            />
            <Box p="6">
              <Badge
                borderRadius="full"
                px="2"
                color={"white"}
                background="linear-gradient(#e54d60 8.81%, #a342ff 94.26%)"
              >
                #{blog.tags[0]}
              </Badge>
              <Heading size="md" my="2" color={"#FFFFFF"}>
                {blog.title}
              </Heading>
              <Text fontSize="sm" color={"#FFFFFF"}>
                {blog.description}
              </Text>
              <Divider my={{ md: "1rem", base: "0.5rem" }} />
              <Flex align="center" mt="4">
                <Avatar size="xs" name={blog.author} src={blog.authorImage} />
                <Text ml="2" fontSize="sm" color={"#FFFFFF"}>
                  {blog.author} - {new Date(blog.publishedAt).toLocaleDateString()}
                </Text>
                 </Flex>
            </Box>
          </Box>
        ))}
          </Flex>
        </Flex>

        <Button
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "20.25rem", base: "12rem" }}
            h={{ md: "3.75rem", base: "2.5rem" }}
            color={'white'}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
            }}
            onClick={() =>
              router.push(
                "/hushhBlogs"
              )
            }
          >
            VIEW ALL
        </Button>
      </Container>
    </>
  );
};
