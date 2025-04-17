"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@synoem/ui/components/button";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

export function ImageModal({ isOpen, imageUrl, onClose }: ImageModalProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Not working
      setScrollPosition(window.scrollY);

      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";

      // Not working
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen, scrollPosition]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-80">
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <img
          src={imageUrl}
          alt="Enlarged drawing"
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </Button>
      </div>
    </div>,
    document.body,
  );
}
