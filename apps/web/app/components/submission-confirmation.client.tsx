"use client";

import { Button } from "@synoem/ui/components/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface SubmissionConfirmationProps {
  title: string;
  message: string;
  onDismiss: () => void;
  buttonText?: string;
}

export const SubmissionConfirmation = ({
  title,
  message,
  onDismiss,
  buttonText = "Start Over",
}: SubmissionConfirmationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="py-10 text-center"
    >
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-6 text-muted-foreground">{message}</p>
      <Button onClick={onDismiss}>{buttonText}</Button>
    </motion.div>
  );
};
