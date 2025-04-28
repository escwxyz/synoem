"use client";

import type { Testimonial } from "@synoem/payload/payload-types";
import { Card, CardHeader, CardContent } from "@synoem/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@synoem/ui/components/avatar";
import { getImageUrl } from "~/utils/get-image";
import { getUrl } from "~/utils/get-url";
import { cn } from "@synoem/ui/lib/utils";

export const DesktopTestimonials = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const validTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.avatar && typeof testimonial.avatar !== "number",
  );

  const displayTestimonials = validTestimonials.slice(0, 4);

  const leftTestimonials = displayTestimonials.slice(
    0,
    Math.min(2, displayTestimonials.length),
  );
  const rightTestimonials = displayTestimonials.slice(
    Math.min(2, displayTestimonials.length),
  );

  return (
    <div className="grid grid-cols-2 gap-8 px-4 py-16">
      <div className="flex flex-col gap-8">
        {leftTestimonials.map((testimonial, index) => {
          const image = testimonial.avatar;
          const imageUrl = getImageUrl(image);

          const isLarge = index === 0;

          return (
            <Card
              key={testimonial.id}
              className={cn(isLarge ? "h-full" : "h-auto")}
            >
              <CardHeader>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={getUrl(imageUrl)}
                      alt={testimonial.name}
                      height={30}
                      width={30}
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className={cn("font-medium line-clamp-6")}>
                    {testimonial.quote}
                  </p>
                </blockquote>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col gap-8">
        {rightTestimonials.map((testimonial, index) => {
          const image = testimonial.avatar;
          const imageUrl = getImageUrl(image);

          const isLarge = rightTestimonials.length > 1 && index === 1;

          return (
            <Card
              key={testimonial.id}
              className={cn("variant-mixed", isLarge ? "h-full" : "h-auto")}
            >
              <CardHeader>
                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={getUrl(imageUrl)}
                      alt={testimonial.name}
                      height={30}
                      width={30}
                      className="object-cover"
                    />

                    <AvatarFallback>
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <blockquote className="grid h-full grid-rows-[1fr_auto] gap-6">
                  <p className={cn("font-medium line-clamp-6")}>
                    {testimonial.quote}
                  </p>
                </blockquote>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
