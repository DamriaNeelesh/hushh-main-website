import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { slug } from "github-slugger";
import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  return (
    <Box py="4" mb={"4"} display={{md:"grid",base:'none'}} alignItems="flex-start" justifyContent="flext-start" textAlign={'left'} flexWrap="wrap" rounded="lg">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} display={{md:'block',base:'none'}} gap={4}>
        <GridItem>
          <Box m="3" textAlign="left" textColor="white" fontWeight="400">
            <Text color="#98989A">Publication Date</Text>
            <Text>{format(parseISO(blog.publishedAt), "LLLL d, yyyy")}</Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box m="3" textAlign="left" textColor="white" fontWeight="400">
            <Text color="#98989A">Author</Text>
            <Text>{blog.author}</Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box m="3" textAlign="left" textColor="white" fontWeight="400">
            <Text color="#98989A">Reading Time</Text>
            <Text>{blog.readingTime.text}</Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box m="3" textAlign="left" textColor="white" fontWeight="400">
            <Text color="#98989A">Category</Text>
            <Text textTransform="capitalize">{blog.tags[0]}</Text>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default BlogDetails;
