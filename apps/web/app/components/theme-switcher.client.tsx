"use client";

import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@synoem/ui/components/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useState } from "react";

interface Props {
  onThemeChange?: () => void;
}

export const ThemeSwitcher = ({ onThemeChange }: Props) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

    setTheme(nextTheme);
    onThemeChange?.();
  };

  return (
    <motion.div initial={false}>
      <Button variant={null} size="icon" onClick={toggleTheme} className="relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "system" && (
            <motion.div
              key="computer"
              aria-label="System Mode"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Monitor className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
          {theme === "dark" && (
            <motion.div
              key="sun"
              aria-label="Light Mode"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}

          {theme === "light" && (
            <motion.div
              key="moon"
              aria-label="Dark Mode"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-[1.2rem] w-[1.2rem] opacity-0">
          <Monitor />
        </div>
      </Button>
    </motion.div>
  );
};
