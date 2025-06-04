"use client";

import { cn } from "@synoem/ui/lib/utils";
import { Check } from "lucide-react";
import { Progress } from "@synoem/ui/components/progress";
import { AnimatePresence, motion } from "motion/react";

interface StepIndicatorProps {
  style?: "default" | "progress";
  /**
   * The orientation of the step indicator, only applicable to the default style
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  steps: { id: string; title: string }[];
  currentStep: number;
}

export const FormStepIndicator = ({
  style = "default",
  orientation = "horizontal",
  steps,
  currentStep,
}: StepIndicatorProps) => {
  return (
    <>
      {style === "progress" ? (
        <div className="mb-8">
          <div className={cn("mb-2 flex justify-between")}>
            <span className="text-sm font-medium">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium">
              {Math.round((100 / steps.length) * currentStep)}%
            </span>
          </div>
          <Progress value={(100 / steps.length) * currentStep} className="h-2" />
        </div>
      ) : (
        <div
          className={cn(
            "mt-6",
            orientation === "vertical" && "space-y-4",
            orientation === "horizontal" && "flex justify-between",
          )}
        >
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={step.id}
                className={cn(
                  "flex items-center",
                  orientation === "horizontal" && "flex-col",
                  orientation === "vertical" && "flex-row",
                  isActive && "text-primary",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-center transition-all duration-300",
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isCompleted ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="number"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {index + 1}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div
                  className={cn(
                    "hidden md:block",
                    orientation === "vertical" && "ml-4 space-y-1",
                    orientation === "horizontal" && "mt-1",
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-medium leading-none",
                      index <= currentStep ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
