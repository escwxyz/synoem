"use client";

import { Button, toast } from "@payloadcms/ui";
import { Banner } from "@payloadcms/ui/elements/Banner";
import React, { useCallback, useState } from "react";

export default function BeforeDashboard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [images, setImages] = useState<string[]>([]);

  const steps: {
    label: string;
    endpoint: string;
    success: string;
    getBody?: () => Promise<any> | any;
    onSuccess?: (data: any) => void;
  }[] = [
    {
      label: "Reset Database",
      endpoint: "/next/seed/reset",
      success: "Database reset successfully.",
    },
    {
      label: "Seed Images",
      endpoint: "/next/seed/images",
      success: "Images seeded successfully.",
      onSuccess: setImages,
    },
    {
      label: "Seed Pages",
      endpoint: "/next/seed/pages",
      success: "Pages seeded successfully.",
      getBody: () => ({ images }),
    },
    // Add more steps as needed
  ];

  // const handleSeed = useCallback(
  //   (index: number) => {
  //     setLoadingStep(index);
  //     setError(null);

  //     if (!process.env.NEXT_PUBLIC_S3_ENDPOINT || !process.env.NEXT_PUBLIC_S3_BUCKET_NAME) {
  //       setError("S3_ENDPOINT and S3_BUCKET_NAME must be set");
  //       setLoadingStep(null);
  //       return;
  //     }

  //     const { endpoint, success, getBody, onSuccess } = steps[index] || {};

  //     if (!endpoint) {
  //       setError("Invalid endpoint");
  //       setLoadingStep(null);
  //       return;
  //     }

  //     try {
  //       const result = toast.promise(
  //         fetch(endpoint, {
  //           method: "POST",
  //           credentials: "include",
  //           headers: { "Content-Type": "application/json" },
  //           ...(getBody && { body: JSON.stringify(getBody()) }),
  //         }).then((res) => res.json()),
  //         { loading: "Seeding...", success: "Success!", error: "Error!" },
  //       );

  //       if (onSuccess) onSuccess(result.images);

  //       setCurrentStep(index + 1);

  //       return true;
  //     } catch (err) {}

  //     try {
  //       toast.promise(
  //         fetch(endpoint, {
  //           method: "POST",
  //           credentials: "include",
  //           headers: { "Content-Type": "application/json" },
  //           ...(getBody && { body: JSON.stringify(getBody()) }),
  //         }).then(async (res) => {
  //           if (res.ok) {
  //             setCurrentStep(index + 1);
  //             return true;
  //           } else {
  //             // Try to extract error message from response
  //             let msg = "An error occurred while seeding.";
  //             try {
  //               const data = await res.json();
  //               if (data?.error) msg = data.error;
  //             } catch {}
  //             throw new Error(msg);
  //           }
  //         }),
  //         {
  //           loading: `Running: ${steps[index]?.label}...`,
  //           success: success,
  //           error: (err: any) => {
  //             setError(err.message || "An error occurred while seeding.");
  //             return err.message || "An error occurred while seeding.";
  //           },
  //         },
  //       );
  //     } catch (err) {
  //       setError(typeof err === "string" ? err : "An error occurred while seeding.");
  //     } finally {
  //       setLoadingStep(null);
  //     }
  //   },
  //   [steps],
  // );

  return (
    <div className="flex flex-col justify-between p-4 items-center gap-4">
      <Banner type="info">
        <h4>Welcome to your dashboard!</h4>
        <span>
          Use the following buttons to seed some predefined data. Each step must be completed in
          order.
        </span>
      </Banner>
      {error && (
        <Banner type="error" className="my-4">
          {error}
        </Banner>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {steps.map((step, index) => (
          <SeedButton
            key={index}
            label={loadingStep === index ? "Seeding..." : step.label}
            onClick={() => console.log(index)}
            disabled={currentStep !== index || loadingStep !== null}
          />
        ))}
      </div>
    </div>
  );
}

const SeedButton = ({
  label,
  onClick,
  disabled,
}: { label: string; onClick: () => void; disabled: boolean }) => {
  return (
    <Button buttonStyle="primary" onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};
