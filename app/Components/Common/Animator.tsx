"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

type Direction = "left" | "right" | "top" | "bottom";

interface AnimatorProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number; // in seconds
  delay?: number; // in seconds
}

const getInitialPosition = (direction: Direction) => {
  switch (direction) {
    case "left":
      return { x: -50, opacity: 0 };
    case "right":
      return { x: 50, opacity: 0 };
    case "top":
      return { y: -50, opacity: 0 };
    case "bottom":
      return { y: 50, opacity: 0 };
    default:
      return { opacity: 0 };
  }
};

const Animator: React.FC<AnimatorProps> = ({
  children,
  direction = "bottom",
  duration = 0.5,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={getInitialPosition(direction)}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Animator;
