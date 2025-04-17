"use client";

import { useImageModal } from "~/hooks/use-image-modal";
import { ImageModal } from "./ImageModal";
import { Button } from "@synoem/ui/components/button";

interface ImageViewerProps {
  imageUrl: string;
  thumbnailUrl?: string;
  alt?: string;
  className?: string;
}

export function ImageViewer({
  imageUrl,
  thumbnailUrl,
  alt = "Image",
  className = "",
}: ImageViewerProps) {
  const {
    isOpen,
    imageUrl: modalImageUrl,
    openModal,
    closeModal,
  } = useImageModal();

  return (
    <>
      <div className={`cursor-pointer ${className}`}>
        <Button
          className={"w-full h-full p-0"}
          onClick={() => openModal(imageUrl)}
        >
          <img
            src={thumbnailUrl || imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-lg transition-opacity hover:opacity-90"
          />
        </Button>
      </div>

      <ImageModal
        isOpen={isOpen}
        imageUrl={modalImageUrl}
        onClose={closeModal}
      />
    </>
  );
}
