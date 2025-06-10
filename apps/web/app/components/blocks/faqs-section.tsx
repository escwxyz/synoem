"use client";

import type { FAQBlockType, Faq as FaqType } from "@synoem/types";
import { cn } from "@synoem/ui/lib/utils";
import { ChevronDown, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { RichText } from "../rich-text.client";
import { Button } from "@synoem/ui/components/button";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export const FaqsSection = ({
  title,
  description,
  type,
  style = "accordion",
  content,
}: FAQBlockType) => {
  if (content.length === 0 || content.some((item) => typeof item === "string")) {
    console.log("FAQ content is not populated");
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden bg-background/50 py-16 rounded-2xl">
      <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div
        className={cn(
          "container relative mx-auto px-4",
          style === "accordion" ? "max-w-6xl" : "max-w-8xl",
        )}
      >
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <h2 className="mb-3 bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-3xl font-bold text-transparent">
              {title}
            </h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </motion.div>
        )}

        <div className="mx-auto max-w-2xl space-y-2">
          {style === "accordion" ? (
            <AccordionFaqList faqs={content as FaqType[]} />
          ) : (
            <CardFaqList faqs={content as FaqType[]} />
          )}
        </div>
        {type === "general" && <GeneralFaqCallout />}
      </div>
    </div>
  );
};

function GeneralFaqCallout() {
  const t = useTranslations("FaqSection");

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn("mx-auto mt-12 max-w-md rounded-lg p-6 text-center")}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 1,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          },
        }}
        className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-2 text-primary"
      >
        <Mail className="h-4 w-4 " />
      </motion.div>
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
          router.push("/contact");
        }}
      >
        {t("contactSupport")}
      </Button>
    </motion.div>
  );
}

function AccordionFaqList({ faqs }: { faqs: FaqType[] }) {
  return (
    <div className="flex flex-col gap-4">
      {faqs.map((item, index) => (
        <FaqItem key={item.id} index={index} style="accordion" {...item} />
      ))}
    </div>
  );
}

function CardFaqList({ faqs }: { faqs: FaqType[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {faqs.map((item, index) => (
        <FaqItem key={item.id} index={index} style="card" {...item} />
      ))}
    </div>
  );
}

const FaqItem = ({
  question,
  answer,
  index,
  type,
  style,
}: FaqType & { index: number; style: FAQBlockType["style"] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const indicator = useMemo(
    () => (
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
          "text-muted-foreground",
        )}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    ),
    [isOpen],
  );

  if (style === "accordion") {
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
          className="flex items-center justify-between gap-4 px-6 py-4 w-full"
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
          {indicator}
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                  opacity: { duration: 0.25, delay: 0.1 },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.25 },
                },
              }}
            >
              <div className="border-t border-border/40 px-6 pb-4 pt-2">
                <motion.div
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  <RichText data={answer} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // TODO: we need better card style

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "h-fit overflow-hidden rounded-xl border border-border",
        isOpen ? "shadow-3xl bg-card/50" : "bg-card/50",
      )}
      style={{ minHeight: "88px" }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <h3 className="text-md font-medium text-foreground">{question}</h3>
        <div className="ml-4 flex-shrink-0">{indicator}</div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-6 pb-6 pt-2 text-muted-foreground">
              <RichText data={answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
