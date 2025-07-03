"use client";
import { useState, useEffect } from "react";
import { Box, Grid } from "@chakra-ui/react";
import Image from "next/image";
import Horizontal1 from "../../../../public/Images/gridImages/Horizontal 1.jpeg";
import Horizontal2 from "../../../../public/Images/gridImages/Horizontal 2.jpeg";
import Horizontal3 from "../../../../public/Images/gridImages/Horizontal 3.jpeg";
import Horizontal4 from "../../../../public/Images/gridImages/Horizontal 4.jpg";
import Vertical1 from "../../../../public/Images/gridImages/Vertical 1.jpeg";
import Vertical2 from "../../../../public/Images/gridImages/Vertical 2.jpeg";
import Vertical3 from "../../../../public/Images/gridImages/Vertical 3.jpeg";
import Vertical4 from "../../../../public/Images/gridImages/Vertical 4.jpeg";
import Vertical5 from "../../../../public/Images/gridImages/Vertical 5.jpg";
import Vertical6 from "../../../../public/Images/gridImages/Vertical 6.jpg";
import Vertical7 from "../../../../public/Images/gridImages/Vertical 7.jpg";

const images = {
  left: [
    Vertical1,
    Vertical2,
    Vertical3,
    Vertical4,
    Vertical5,
    Vertical6,
    Vertical7,
  ],
  right: [
    [Horizontal1, Horizontal2, Horizontal3, Horizontal4],
    [Horizontal4, Horizontal3, Horizontal2, Horizontal1],
  ],
};

export default function ImageGrid() {
  const [currentLeftImage, setCurrentLeftImage] = useState(0);
  const [currentRightImages, setCurrentRightImages] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % images.left.length);
      setCurrentRightImages((prev) => (prev + 1) % images.right.length);
    }, 4000); // 4 seconds interval for smoother experience

    return () => clearInterval(interval);
  }, []);

  return (
    <Box width="100%" height="auto" minHeight={{ base: "400px", md: "500px" }}>
     <Grid
       templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap="8px"
        height="100%"
        minHeight="inherit" 
      >
        <Box
          position="relative" 
          height="100%"
          minHeight={{ base: "200px", md: "250px" }}
          overflow="hidden"
        >
          {images.left.map((image, index) => (
             <Box 
              key={`left-${index}`} 
              position="absolute" 
                            top="0" 
                            left="0" 
                            width="100%" 
                            height="100%" 
                            display={currentLeftImage === index ? 'block' : 'none'}
            >
              <Image
                src={image}
                alt={`Hushh Featured Image ${index + 1}`}
                priority={index === 0}
                quality={90}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ 
                  objectFit: 'cover',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
            </Box>
          ))}
         </Box> 
         <Box
          display="flex" 
          flexDirection="column" 
          gap="8px" 
          height="100%" 
          minHeight={{ base: "200px", md: "250px" }}
        >
          {images.right[currentRightImages].map((image, index) => (
            <Box 
              key={`right-${index}`} 
              flex={index === 0 ? 2 : 1}
                          position="relative" 
                          width="100%"
                          overflow="hidden" 
            >
              <Image
                src={image}
                alt={`Hushh Featured Image Right ${index + 1}`}
                priority={index === 0 && currentRightImages === 0}
                quality={90}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ 
                  objectFit: 'cover',
                  opacity: isLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              />
             </Box> 
          ))}
         </Box> 
      </Grid>
    </Box>
  );
}
