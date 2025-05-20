"use client";

import { useState, useCallback } from "react";
import { type FileError, type FileRejection, useDropzone } from "react-dropzone";
import { UploadCloud, X, FileText, ImageIcon, File } from "lucide-react";
import { Button } from "@synoem/ui/components/button";
import { Alert, AlertDescription } from "@synoem/ui/components/alert";
import { Progress } from "@synoem/ui/components/progress";
import { cn } from "@synoem/ui/lib/utils";
import { useTranslations } from "next-intl";

export type FileUploaderProps = {
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
  disabled?: boolean;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  description?: string;
  supportedFileTypes?: string;
};

export const FileUploader = ({
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "image/jpeg": [".jpg", ".jpeg"],
    "image/png": [".png"],
  },
  className,
  disabled = false,
  onFilesChange,
  label = "Drag & drop files here or",
  description = "Upload files",
  supportedFileTypes = "PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (max file size: 10MB)",
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const errorMessages = rejectedFiles
          .map((rejection) => {
            const errors = rejection.errors.map((e: FileError) => e.message).join(", ");
            return `${rejection.file.name}: ${errors}`;
          })
          .join("; ");

        setError(errorMessages);
        return;
      }

      if (files.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload a maximum of ${maxFiles} files.`);
        return;
      }

      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);

      for (const file of acceptedFiles) {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.floor(Math.random() * 10) + 5;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        }, 300);
      }

      if (onFilesChange) {
        onFilesChange(newFiles);
      }
    },
    [files, maxFiles, onFilesChange],
  );

  const removeFile = (fileToRemove: File) => {
    const newFiles = files.filter((file) => file !== fileToRemove);
    setFiles(newFiles);

    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileToRemove.name];
      return newProgress;
    });

    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    disabled,
    multiple: maxFiles > 1,
  });

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      return <ImageIcon className="h-6 w-6 text-muted-foreground" />;
    }
    if (["pdf", "doc", "docx"].includes(extension || "")) {
      return <FileText className="h-6 w-6 text-muted-foreground" />;
    }
    return <File className="h-6 w-6 text-muted-foreground" />;
  };

  const t = useTranslations("FileUploader");

  return (
    <div className={cn("w-full", className)}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors",
          "flex flex-col items-center justify-center text-center",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          "hover:border-primary/50 hover:bg-primary/5",
        )}
      >
        <input {...getInputProps()} />

        <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />

        <div className="space-y-2">
          <p className="text-sm font-medium">
            {label}{" "}
            <Button variant="link" size="sm" className="px-1">
              {description}
            </Button>
          </p>
          <p className="text-xs text-muted-foreground">{supportedFileTypes}</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-4">
          <p className="text-sm font-medium">
            {t("uploadedFiles", { count: files.length, max: maxFiles })}
          </p>
          <div className="space-y-3">
            {files.map((file) => {
              const progress = uploadProgress[file.name];

              return (
                <div
                  key={file.lastModified}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.name)}
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {progress !== undefined && progress < 100 ? (
                      <div className="w-24">
                        <Progress value={progress} className="h-2" />
                      </div>
                    ) : (
                      <span className="text-xs text-green-600 font-medium">Complete</span>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file);
                      }}
                      className="h-8 w-8 rounded-full"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
