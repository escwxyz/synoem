"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { motion, AnimatePresence } from "motion/react";

export const ThemeSwitch = () => {
  const isDarkMode = React.useRef(
    typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  const [, forceUpdate] = React.useState({});

  React.useEffect(() => {
    isDarkMode.current = document.documentElement.classList.contains("dark");
    forceUpdate({});

    const observer = new MutationObserver(() => {
      isDarkMode.current = document.documentElement.classList.contains("dark");
      forceUpdate({});
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode.current;
    document.documentElement.classList[newIsDark ? "add" : "remove"]("dark");
  };

  return (
    <motion.div initial={false}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode.current ? (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
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
          {isDarkMode.current ? <Sun /> : <Moon />}
        </div>
      </Button>
    </motion.div>
  );
};
