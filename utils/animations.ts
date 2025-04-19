import { Variants } from "framer-motion";

/**
 * Fade in animation variants for Framer Motion
 */
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay: number = 0.2
): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay,
      },
    },
  };
};

/**
 * Staggered animation for children elements
 */
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Scale animation variants for Framer Motion
 */
export const scaleIn = (delay: number = 0): Variants => {
  return {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay,
      },
    },
  };
};

/**
 * Slide in animation variants for Framer Motion
 */
export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  type: "tween" | "spring" = "tween",
  delay: number = 0,
  duration: number = 0.5
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

/**
 * Hover scale animation for interactive elements
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

/**
 * Tap scale animation for buttons and interactive elements
 */
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

/**
 * Animation variants for page transitions
 */
export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Animation variants for list items
 */
export const listItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Animation variants for buttons
 */
export const buttonVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
};

/**
 * Animation variants for cards
 */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const scaleDown: Variants = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    scale: 1.2,
    transition: { 
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

/**
 * Enhanced stagger container with exit animations
 */
export const staggerContainerWithExit: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const buttonHover: Variants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  },
  tap: { 
    scale: 0.95,
    transition: { 
      duration: 0.1,
      ease: "easeInOut"
    }
  }
};

export const cardHover: Variants = {
  idle: { 
    y: 0, 
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    y: -5, 
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const spinnerAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear"
    }
  }
};

export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop"
    }
  }
};

export const collapseAnimation: Variants = {
  hidden: { 
    height: 0,
    opacity: 0,
    overflow: "hidden" 
  },
  visible: { 
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut"
      },
      opacity: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.1
      }
    }
  }
};

export const skeletonAnimation: Variants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 0%"],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1.5,
      ease: "linear"
    }
  }
};

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.2,
      delay: 0.1
    }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut",
      delay: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    y: 20,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const popIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.5, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.5, 
    y: 20,
    transition: { 
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const createStaggerChildren = (delay: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay
    }
  }
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
}; 