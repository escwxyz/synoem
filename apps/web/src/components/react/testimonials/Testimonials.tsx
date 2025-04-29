"use client";

import type { Testimonial } from "@synoem/payload/payload-types";
import { useMediaQuery } from "usehooks-ts";
import { DesktopTestimonials } from "./DesktopTestimonials";
import { MobileTestimonials } from "./MobileTestimonials";

export const Testimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? (
        <DesktopTestimonials testimonials={testimonials} />
      ) : (
        <MobileTestimonials testimonials={testimonials} />
      )}
    </>
  );
};
