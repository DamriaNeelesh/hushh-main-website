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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLeftImage((prev) => (prev + 1) % images.left.length);
      setCurrentRightImages((prev) => (prev + 1) % images.right.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box>
      <Grid display={'flex'} templateColumns="1fr 1fr">
        <Grid flex={1} templateRows={"2fr"}>
          <Image src={images.left[currentLeftImage]} alt="Left Image" />
        </Grid>
        <Grid flex={1} flexDirection={'column'} gap={'0'}  h={'100%'}>
          <Image
            src={images.right[currentRightImages][0]}
            alt="Right Top Image"
            style={{height:'100%', width:'100%'}}
          />
          <Image
            src={images.right[currentRightImages][1]}
            alt="Right Bottom Image"
            style={{height:'77.75%',width:'100%'}}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
