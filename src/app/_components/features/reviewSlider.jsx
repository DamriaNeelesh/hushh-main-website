import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import customer1 from "../../../../public/Images/customers/customer1.png";
import customer2 from "../../../../public/Images/customers/customer2.png";
import customer3 from "../../../../public/Images/customers/customer3.png";

const ReviewSlider = () => {
  const reviews = [
    {
      name: "Emily Smith",
      imageUrl: customer1,
      review:
        "I absolutely love the Hushh Wallet App! It's incredibly user-friendly and helps me keep all my data organized.",
    },
    {
      name: "David Johnson",
      imageUrl: customer2,
      review:
        "Hushh Button has made my online shopping experience so much smoother and quicker.",
    },
    {
      name: "Ethan Thompson",
      imageUrl: customer3,
      review:
        "Hushh Browser Companion is a must-have for anyone concerned about their online privacy.",
    },
  ];

  return (
    <Box>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <VStack
              bg="gray.800"
              borderRadius="md"
              p="4"
              align="center"
              spacing="4"
            >
              <Image
                src={review.imageUrl}
                alt={review.name}
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
              <Text fontWeight="bold" color="white">
                {review.name}
              </Text>
              <Text color="gray.300" textAlign="center">
                {review.review}
              </Text>
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ReviewSlider;
