import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore from 'swiper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Pagination, Scrollbar, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, HStack, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import user1 from "../../../../public/Images/customers/user1.png";
import customer1 from "../../../../public/Images/customers/customer1.png";
import customer2 from "../../../../public/Images/customers/customer2.png";
import customer3 from "../../../../public/Images/customers/customer3.png";
import customer4 from "../../../../public/Images/customers/customer4.png";
import customer5 from "../../../../public/Images/customers/customer5.png";
import customer6 from "../../../../public/Images/customers/customer6.png";
import { useMediaQuery } from "@chakra-ui/react";

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ReviewSlider = () => {
  const customerReviews = [
    {
      name: "Emily Smith",
      imageUrl: customer1,
      review:
        "I absolutely love the Hushh Wallet App! It's incredibly user-friendly and helps me keep all my data organized and full control over my digital identity. It's a win-win for both customers and brands!",
    },
    {
      name: "David Johnson",
      imageUrl: customer2,
      review:
        "Hushh Button has made my online shopping experience so much smoother and quick. With just a click, my preferences are synced across brands & giving me a personalized shopping every time.",
    },
    {
      name: "Ethan Thompson",
      imageUrl: customer3,
      review:
        "Hushh Browser Companion is a must-have for anyone concerned about their online privacy. It gives me full control over my digital identity & allows me to choose what information I want to share.",
    },
    {
      name: "Michael Brown",
      imageUrl: customer4,
      review:
        "The Vibe Search App has revolutionized how I shop online. I no longer have to spend hours browsing through endless product pages. With Vibe Search, I can simply upload a picture & find similar products.",
    },
    {
      name: "Ethan Miller",
      imageUrl: customer5,
      review:
        "Hushh Wallet App has helped me take control of my digital identity. I can now manage my data across different platforms and earn rewards for sharing it with trusted brands. It's empowering and rewarding!",
    },
    {
      name: "Sophia Martinez",
      imageUrl: customer6,
      review:
        "As a frequent online shopper, the Hushh Button has been a game-changer. It streamlines the shopping process & ensures that I receive personalized recommendations based on my preferences.",
    },
    {
      name: "Ava Anderson",
      imageUrl: user1,
      review:
        "With Hushh Browser Companion, I finally feel in control of my online data. I can choose what information to keep private and customize and what to share, giving me peace of mind while browsing.",
    },
  ];
  const initialActiveIndex = 1;
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");

  const maxContentLength = 200;
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, []);

  return (
    <>
      <Text
        textAlign={"center"}
        mt={{ base: "3rem", md: "7rem" }}
        fontSize={{ base: "2rem", md: "3.75rem" }}
        fontWeight={"700"}
        className="gradient"
        visibility={"visible"}
      >
        What our users say?
      </Text>
      <Text
        textAlign={"center"}
        fontWeight={"500"}
        fontSize={{ base: "1rem", md: "1.75rem" }}
        className="default-gradient"
      >
        Coming Soon!!
      </Text>
      <Text
        textAlign={"center"}
        fontWeight={"400"}
        fontSize={{ base: "0.75rem", md: "1.15rem" }}
        className="gradient"
      >
        "We're building amazing products and can't wait to share it with you!
        Here are some testimonials of what we're aiming to achieve"
      </Text>
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        initialSlide={initialActiveIndex}
        modules={[Pagination, Navigation]}
        navigation
        pagination={{
          clickable: true,
          loop: true,
        }}
        slidesOffsetBefore={isDesktop ? -230 : 0}
        centeredSlides={isDesktop}
        style={{ visibility: isLoaded ? "visible" : "hidden" }}
      >
        {customerReviews.map((customer, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <Box
                cursor={"pointer"}
                bg={
                  hoveredIndex === index
                    ? "white"
                    : isActive
                      ? "white"
                      : "#3C3C3C"
                }
                borderRadius={"40px"}
                mt={{ base: "2rem", md: "3rem" }}
                display={"flex"}
                mx={{ base: "1rem", md: "0" }}
                gap={{ md: "0.5rem", base: "0.5rem" }}
                p={{ md: "2rem", base: "1.5rem" }}
                flexDirection={"column"}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                boxShadow={
                  hoveredIndex !== index && !isActive
                    ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                    : "none"
                }
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  borderRadius="40px"
                  bg="rgba(0, 0, 0, 0.3)"
                  opacity={hoveredIndex !== index && !isActive ? 1 : 0}
                  transition="opacity 0.3s ease"
                ></Box>

                <Text
                  className="review-text"
                  color="black"
                  fontWeight={"400"}
                  fontSize={{ md: "1rem", base: "0.75rem" }}
                  lineHeight={{ md: "1.5rem", base: "1rem" }}
                >
                  {customer.review.length > maxContentLength
                    ? customer.review.substring(0, maxContentLength) + "..."
                    : customer.review}
                </Text>

                <HStack display={"flex"} flexDirection={"row"}>
                  <Image
                    width={60}
                    height={60}
                    alt={customer.name}
                    src={customer.imageUrl}
                  />
                  <Text
                    color="black"
                    fontSize={{ md: "1rem", base: "0.75rem" }}
                    fontWeight={"700"}
                    lineHeight={"18px"}
                    letterSpacing={"0.8px"}
                  >
                    {customer.name}
                  </Text>
                </HStack>
                <Box className="rating">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      color="#FFD700"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ReviewSlider;
