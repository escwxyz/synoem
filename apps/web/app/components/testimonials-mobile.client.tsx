"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import Image from "next/image";

import { getUrl } from "~/utils/get-url";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@synoem/types";
import { ImagePlaceholder } from "@synoem/ui/components/image-placeholder";

export const MobileTestimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const t = useTranslations("Component");

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => {
                const image = testimonial.avatar;

                const hasImage = typeof image === "object" && image?.url;

                return (
                  <motion.div
                    key={testimonial.id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    {hasImage ? (
                      <Image
                        src={getUrl(image.url ?? "")}
                        width={500}
                        height={500}
                        alt={testimonial.name}
                        className="h-full w-full object-cover rounded-3xl object-center"
                      />
                    ) : (
                      <ImagePlaceholder
                        className="h-full w-full rounded-3xl object-cover object-center"
                        width={500}
                        height={500}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-foreground">{testimonials[active]?.name}</h3>
            <p className="text-sm text-muted-foreground/60">{testimonials[active]?.designation}</p>
            <motion.p className="mt-8 text-lg text-muted-foreground">
              {testimonials[active]?.quote.split(" ").map((word, index) => (
                <motion.span
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 items-center justify-between pt-12 md:pt-0">
            <Button
              onClick={handlePrev}
              className="flex items-center justify-center rounded-full bg-muted dark:bg-muted"
            >
              <ArrowLeft className="h-5 w-5 text-muted-foreground transition-transform duration-300 dark:text-muted-foreground" />{" "}
              <span className="text-sm text-muted-foreground">{t("Testimonials.prev")}</span>
            </Button>
            <Button
              onClick={handleNext}
              className="flex items-center justify-center rounded-full bg-muted dark:bg-muted"
            >
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 dark:text-muted-foreground" />{" "}
              <span className="text-sm text-muted-foreground">{t("Testimonials.next")}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
