"use client";

import { useState } from "react";
import { MobileMenu } from "./mobile-menu.client";
import type { MenuItems } from "@synoem/types";
import { motion, type Variants } from "motion/react";

interface Props {
  items: NonNullable<MenuItems>;
}

export const MobileNavigation = ({ items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const menuVariants: Variants = {
    open: {
      opacity: 1,
      visibility: "visible",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      visibility: "hidden",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        className="relative w-8 h-8 flex items-center justify-center"
      >
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="absolute left-px top-2 block h-px w-5 rounded-full bg-current"
        />
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="absolute left-px top-4 block h-px w-5 rounded-full bg-current"
        />
        <motion.span
          animate={!isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="absolute bottom-1.5 left-px block h-px w-5 rounded-full bg-current"
        />
        <motion.span
          animate={{
            visibility: isOpen ? "visible" : "hidden",
            rotate: isOpen ? 45 : 0,
            opacity: isOpen ? 1 : 0,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          className="absolute left-[3px] top-4 h-px w-[18px] rounded-full bg-current"
        />
        <motion.span
          animate={{
            visibility: isOpen ? "visible" : "hidden",
            rotate: isOpen ? -45 : 0,
            opacity: isOpen ? 1 : 0,
            transition: {
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
          className="absolute left-[3px] top-4 h-px w-[18px] rounded-full bg-current"
        />
      </button>
      <MobileMenu items={items} isOpen={isOpen} />
    </>
  );
};
