"use client";

import { useAtomValue } from "jotai";
import { showInHeaderAtom } from "~/atoms";
import { useIsMobile } from "@synoem/ui/hooks/use-mobile";
import { ThemeSwitcher } from "~/components/theme-switcher.client";
import dynamic from "next/dynamic";
import type { Locale } from "@synoem/config";
import { AnimatePresence, motion } from "motion/react";

const RequestQuoteButton = dynamic(
  () => import("~/components/request-quote-button").then((mod) => mod.RequestQuoteButton),
  {
    ssr: false,
  },
);

interface HeaderButtonsProps {
  locale: Locale;
}

export const HeaderButtons = ({ locale }: HeaderButtonsProps) => {
  const showInHeader = useAtomValue(showInHeaderAtom);
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ThemeSwitcher />;
  }

  return (
    <div className="flex w-1/2 justify-end items-center gap-4">
      <motion.div layout transition={{ type: "spring", stiffness: 400, damping: 30 }}>
        <ThemeSwitcher />
      </motion.div>
      <AnimatePresence>
        {showInHeader && (
          <motion.div
            key="request-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <RequestQuoteButton locale={locale} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
