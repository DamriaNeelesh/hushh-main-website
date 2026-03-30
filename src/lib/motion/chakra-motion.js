"use client";

import {
  Box,
  Button,
  Card,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import {
  ensureGsapPlugins,
  resolveMotionState,
  toGsapTweenOptions,
  toGsapVars,
  useReducedMotionPreference,
} from "@/app/_components/motion/gsapMotion";

function setNodeRef(targetRef, node) {
  if (!targetRef) {
    return;
  }

  if (typeof targetRef === "function") {
    targetRef(node);
    return;
  }

  targetRef.current = node;
}

function createMotionComponent(Component) {
  return forwardRef(function GsapMotionComponent(props, forwardedRef) {
    const {
      initial,
      animate,
      variants,
      transition,
      whileHover,
      whileTap,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPointerCancel,
      children,
      ...rest
    } = props;
    const innerRef = useRef(null);
    const reduceMotion = useReducedMotionPreference();

    useLayoutEffect(() => {
      ensureGsapPlugins();

      const element = innerRef.current;
      if (!element) {
        return undefined;
      }

      const fromState = resolveMotionState(initial, variants);
      const toState = resolveMotionState(animate, variants);

      if (!fromState || !toState || reduceMotion) {
        gsap.set(element, toGsapVars(toState || fromState || {}));
        return undefined;
      }

      const tween = gsap.fromTo(
        element,
        toGsapVars(fromState),
        {
          ...toGsapVars(toState),
          ...toGsapTweenOptions(typeof transition === "object" ? transition : null),
        }
      );

      return () => tween.kill();
    }, [animate, initial, reduceMotion, transition, variants]);

    const animateInteractiveState = (state, fallbackState) => {
      if (!innerRef.current) {
        return;
      }

      const nextState = resolveMotionState(state);
      if (!nextState || reduceMotion) {
        return;
      }

      gsap.to(innerRef.current, {
        ...toGsapVars(nextState),
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (fallbackState) {
        gsap.set(innerRef.current, toGsapVars(fallbackState));
      }
    };

    const resolvedAnimate = resolveMotionState(animate, variants);

    return (
      <Component
        {...rest}
        ref={(node) => {
          innerRef.current = node;
          setNodeRef(forwardedRef, node);
        }}
        onMouseEnter={(event) => {
          animateInteractiveState(whileHover);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          animateInteractiveState(resolvedAnimate || animate);
          onMouseLeave?.(event);
        }}
        onPointerDown={(event) => {
          animateInteractiveState(whileTap);
          onPointerDown?.(event);
        }}
        onPointerUp={(event) => {
          animateInteractiveState(whileHover || resolvedAnimate || animate);
          onPointerUp?.(event);
        }}
        onPointerCancel={(event) => {
          animateInteractiveState(resolvedAnimate || animate);
          onPointerCancel?.(event);
        }}
      >
        {children}
      </Component>
    );
  });
}

export const MotionBox = createMotionComponent(Box);
export const MotionButton = createMotionComponent(Button);
export const MotionHeading = createMotionComponent(Heading);
export const MotionText = createMotionComponent(Text);
export const MotionCard = createMotionComponent(Card);
