import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useResponsiveSizes } from "../../context/responsive";
import contentMap from "../productData/contentMap";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const isMobile = useResponsiveSizes();
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const inputRef = useRef(null);
  const recommendationsRef = useRef(null);

  const updateRecommendations = (query) => {
    if (!query) {
      setRecommendations([]);
      setShowRecommendations(false);
      return;
    }

    const matched = contentMap.filter(
      (item) =>
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query.toLowerCase())
        ) || item.content.toLowerCase().includes(query.toLowerCase())
    );

    setRecommendations(matched);
    setShowRecommendations(true);
  };

  useEffect(() => {
    updateRecommendations(searchQuery);
  }, [searchQuery]);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsClicked(false);
      setShowRecommendations(false);
    }
  };

  const handleClick = (event) => {
    if (
      (inputRef.current && !inputRef.current.contains(event.target)) ||
      (recommendationsRef.current && !recommendationsRef.current.contains(event.target))
    ) {
      setIsClicked(false);
      setShowRecommendations(false);
    }
  };

  return (
    <Box position="relative" ref={inputRef}>
      <Flex align="center">
        <Input
          aria-label="Search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          bg="white"
          borderRadius="md"
          _focus={{ borderColor: "blue.500" }}
        />
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={() => setIsClicked(true)}
        />
      </Flex>
      {showRecommendations && (
        <VStack
          ref={recommendationsRef}
          position="absolute"
          top="100%"
          left="0"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          zIndex="10"
          width="100%"
        >
          {recommendations.map((item, index) => (
            <Text key={index} p="2" onClick={() => router.push(item.link)}>
              {item.title}
            </Text>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default SearchBar;
