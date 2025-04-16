// TODO

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@synoem/ui/components/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@synoem/ui/components/card";
import { CheckCircle, ArrowRight } from "lucide-react";

interface ConfirmationProps {
  title?: string;
  message?: string;
  onDismiss?: () => void;
  type?: "newsletter" | "form";
}

export const SubmissionConfirmation = ({
  title = "Submission Successful!",
  message = "Thank you for your submission. We'll be in touch soon.",
  onDismiss = () => {},
  type = "form",
}: ConfirmationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="overflow-hidden bg-transparent">
            <CardHeader className="pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </motion.div>
              <CardTitle className="text-center text-xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center text-muted-foreground"
              >
                <p>{message}</p>
                {type === "newsletter" && (
                  <p className="mt-2 text-sm">
                    We've sent a confirmation email to your inbox. Please check
                    your email to complete the subscription.
                  </p>
                )}
              </motion.div>
            </CardContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button onClick={handleDismiss} className="px-6">
                  {type === "newsletter" ? "Close" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
