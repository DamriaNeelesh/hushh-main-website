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
    <Box>
      <Grid display={'flex'} templateColumns="1fr 1fr">
        <Grid flex={1} templateRows={"2fr"}>
          {images.left.map((image, index) => (
            <div 
              key={`left-${index}`} 
              style={{ 
                display: currentLeftImage === index ? 'block' : 'none',
                width: '100%',
                height: '100%',
                position: 'relative'
              }}
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
                onLoad={() => index === currentLeftImage && setIsLoaded(true)}
              />
            </div>
          ))}
        </Grid>
        <Grid flex={1} flexDirection={'column'} gap={'0'} h={'100%'}>
          {images.right[currentRightImages].map((image, index) => (
            <div 
              key={`right-${index}`} 
              style={{ 
                width: '100%', 
                height: index === 0 ? '100%' : '77.75%',
                position: 'relative',
                marginBottom: index === 0 ? '8px' : 0
              }}
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
            </div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
