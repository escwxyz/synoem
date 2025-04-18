"use client";

import { useState, useCallback } from "react";

export function useImageModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const openModal = useCallback((url: string) => {
    setImageUrl(url);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, imageUrl, openModal, closeModal };
}
