import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const motionForwardProp = (prop) =>
  isValidMotionProp(prop) || shouldForwardProp(prop);

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: motionForwardProp,
});

export const MotionButton = chakra(motion.button, {
  shouldForwardProp: motionForwardProp,
});

export const MotionHeading = chakra(motion.h2, {
  shouldForwardProp: motionForwardProp,
});

export const MotionText = chakra(motion.p, {
  shouldForwardProp: motionForwardProp,
});
