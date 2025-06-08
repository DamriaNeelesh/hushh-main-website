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
  // useColorModeValue, // No longer used
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react"; // useEffect and useState removed
// Apporv import seems unused, PythonEng unused, DiscoverFashion unused, WalletBlog unused. Consider removing if not needed.
// import Apporv from "../_components/svg/aboutImages/TeamImages/ApoorvBedmutha.svg";
// import PythonEng from "../../../public/blogs/python_Eng_with_hushh.png";
import { useRouter } from "next/navigation";
// import DiscoverFashion from '../../../public/blogs/discoveryFashion1.png'
// import WalletBlog from "../../../public/blogs/hushhwalletBlog.png"
import Link from "next/link"; // Keep for VIEW ALL button if /hushhBlogs is internal
import { allBlogs } from "contentlayer/generated"; // Data source for blogs
import BlogImage from '../../../public/blogs/blog2o.png'; // Static image for previews

export const HushhBlogsHome = () => {
    const router = useRouter(); // Keep for VIEW ALL button if needed for other reasons

    // Prepare blog data directly - this runs on server during pre-render & on client
    const sortedBlogs = allBlogs
      .filter(blog => blog.isPublished !== false) // Ensure only published blogs are considered
      .sort((a, b) => new Date(b.updatedAt || b.publishedAt) - new Date(a.updatedAt || a.publishedAt))
      .slice(0, 3); // Get top 3 blogs

    // console.log('Top 3 blogs for homepage:', sortedBlogs); // For debugging, can be removed

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
           {sortedBlogs.map((blog) => (
            <Link href={blog.url || `/blog/${blog.slugAsParams}`} key={blog.slugAsParams} passHref legacyBehavior>
              <Box
                as="a" // Making the Box behave as an anchor tag
                maxW="sm"
                borderRadius="2.5rem"
                overflow="hidden"
                bg={"#1C1C1C"}
                cursor={"pointer"}
                _hover={{ textDecoration: 'none', transform: 'scale(1.03)' }} // Added hover effect
                transition="transform 0.2s ease-in-out" // Smooth transition
              >
                <Image
                  src={blog.image || BlogImage} // Use blog.image from frontmatter if available, else fallback
                  alt={blog.title}
                  width={382} // Direct prop
                  height={300} // Direct prop
                  style={{ objectFit: "cover" }} // Ensure image covers the area
                />
                <Box p="6">
                  {blog.tags && blog.tags.length > 0 && (
                    <Badge
                      borderRadius="full"
                      px="2"
                      color={"white"}
                      background="linear-gradient(#e54d60 8.81%, #a342ff 94.26%)"
                    >
                      #{blog.tags[0]}
                    </Badge>
                  )}
                  <Heading size="md" my="2" color={"#FFFFFF"}>
                    {blog.title}
                  </Heading>
                  <Text fontSize="sm" color={"#FFFFFF"} noOfLines={3}> {/* Added noOfLines to prevent overflow */}
                    {blog.description}
                  </Text>
                  <Divider my={{ md: "1rem", base: "0.5rem" }} />
                  <Flex align="center" mt="4">
                    {/* Assuming author might have an image defined in frontmatter, else just name */}
                    {/* <Avatar size="xs" name={blog.author} src={blog.authorImage} /> */}
                    <Text ml="2" fontSize="sm" color={"#FFFFFF"}>
                      {blog.author} - {new Date(blog.publishedAt).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Box>
              </Box>
            </Link>
        ))}
          </Flex>
        </Flex>

        <Button
            as={Link} // Use Chakra's 'as' prop with Next.js Link
            href="/hushhBlogs" // Assuming this is an internal page for all blogs
            border={"1px solid #606060"}
            borderRadius={"2px"}
            w={{ md: "20.25rem", base: "12rem" }}
            h={{ md: "3.75rem", base: "2.5rem" }}
            color={'white'}
            lineHeight={{ md: "28px", base: "14px" }}
            background={"transparent"}
            letterSpacing={{ md: "0.5rem", base: "0.25rem" }}
            textAlign="center" // Ensure text is centered in button
            _hover={{
              background:
                "linear-gradient(265.3deg, #E54D60 8.81%, #A342FF 94.26%)",
              border: "none",
              textDecoration: 'none' // Remove underline on hover for button-like Link
            }}
            // onClick={() => // router.push removed, Link handles navigation
            //   router.push(
            //     "/hushhBlogs"
            //   )
            // }
          >
            VIEW ALL
        </Button>
      </Container>
    </>
  );
};
