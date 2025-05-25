"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { cn } from "@synoem/ui/lib/utils";
import { Button } from "@synoem/ui/components/button";
import type { Faq } from "@synoem/types";
import type { APIResponse } from "../types/api-response";
import { useTranslations } from "next-intl";
import type { ProductTypeId } from "@synoem/config";

type FAQContent = {
  question: string;
  answer: string;
  id?: string | null;
};

type FAQItemProps = FAQContent & { index: number };
const FAQItem = ({ question, answer, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={cn(
        "group rounded-lg border border-border/60",
        "transition-all duration-200 ease-in-out",
        isOpen ? "bg-card/30 shadow-sm" : "hover:bg-card/50",
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={cn(
            "text-left text-base font-medium transition-colors duration-200",
            "text-foreground/80",
            isOpen && "text-foreground",
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "shrink-0 rounded-full p-0.5",
            "transition-colors duration-200",
            isOpen ? "text-primary" : "text-muted-foreground",
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}
          >
            <div className="border-t border-border/40 px-6 pb-4 pt-2">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FaqSection = <T extends "general" | ProductTypeId>({
  faqsPromise,
  type,
}: { faqsPromise: Promise<APIResponse<Pick<Faq, T>>>; type: T }) => {
  const faqsResponse = use(faqsPromise);

  if (!faqsResponse.data || faqsResponse.status === "error") {
    return null;
  }

  const faqs = faqsResponse.data;

  const { [type]: data } = faqs;

  const t = useTranslations("FaqSection");

  // TODO: render different styles based on the type of faqs

  return (
    <section className="relative w-full overflow-hidden bg-background/50 py-16 rounded-2xl">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="mb-3 bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-3xl font-bold text-transparent">
            {t("title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-2">
          {data?.content?.map((faq, index) => (
            <FAQItem key={faq.id} {...faq} index={index} />
          ))}
        </div>
        {type === "general" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={cn("mx-auto mt-12 max-w-md rounded-lg p-6 text-center")}
          >
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <p className="mb-1 text-sm font-medium text-foreground">{t("stillHaveQuestions")}</p>
            <p className="mb-4 text-xs text-muted-foreground">{t("weAreHereToHelp")}</p>
            <Button
              type="button"
              className={cn(
                "rounded-md px-4 py-2 text-sm",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90",
                "transition-colors duration-200",
                "font-medium",
              )}
              onClick={() => {
                console.log("contact support");
                // TODO: either navigate to simple inquiry form or open contact form
              }}
            >
              {t("contactSupport")}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
