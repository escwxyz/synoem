"use client";

import { Button, toast } from "@payloadcms/ui";
import { Banner } from "@payloadcms/ui/elements/Banner";
import React, { useState } from "react";

export default function BeforeDashboard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const steps = [
    {
      label: "Start Seeding",
      loadingLabel: "Resetting database...",
      handler: async () => {
        setLoading(true);
        setError(null);
        try {
          toast.promise(
            fetch("/next/seed/reset", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }).then((res) => {
              if (!res.ok) throw new Error("An error occurred while resetting database.");
            }),
            {
              loading: "Resetting database...",
              success: "Database reset successfully.",
              error: "An error occurred while resetting database.",
            },
          );
          setCurrentStep((step) => step + 1);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An error occurred while resetting database.",
          );
        } finally {
          setLoading(false);
        }
      },
    },
    {
      label: "Seed Images",
      loadingLabel: "Seeding images...",
      handler: async () => {
        setLoading(true);
        setError(null);
        try {
          toast.promise(
            fetch("/next/seed/images", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
            }).then(async (res) => {
              if (!res.ok) throw new Error("An error occurred while seeding images.");
              const data = await res.json();
              setImages(data.images);
            }),
            {
              loading: "Seeding images...",
              success: "Images seeded successfully.",
              error: "An error occurred while seeding images.",
            },
          );
          setCurrentStep((step) => step + 1);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred while seeding images.");
        } finally {
          setLoading(false);
        }
      },
    },
    {
      label: "Seed Collections",
      loadingLabel: "Seeding collections...",
      handler: async () => {
        setLoading(true);
        setError(null);
        try {
          toast.promise(
            fetch("/next/seed/collections", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ images }),
            }).then((res) => {
              if (!res.ok) throw new Error("An error occurred while seeding collections.");
            }),
            {
              loading: "Seeding collections...",
              success: "Collections seeded successfully.",
              error: "An error occurred while seeding collections.",
            },
          );
          setCurrentStep((step) => step + 1);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "An error occurred while seeding collections.",
          );
        } finally {
          setLoading(false);
        }
      },
    },
    {
      label: "Seed Globals",
      loadingLabel: "Seeding global...",
      handler: async () => {
        setLoading(true);
        setError(null);
        try {
          toast.promise(
            fetch("/next/seed/globals", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ images }),
            }).then((res) => {
              if (!res.ok) throw new Error("An error occurred while seeding globals.");
            }),
            {
              loading: "Seeding globals...",
              success: "Globals seeded successfully.",
              error: "An error occurred while seeding globals.",
            },
          );
          setCurrentStep((step) => step + 1);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred while seeding globals.");
        } finally {
          setLoading(false);
        }
      },
    },
  ];

  const current = steps[currentStep];

  return (
    <div className="flex p-4 items-start justify-between gap-4">
      <div className="flex flex-col gap-4">
        <Banner type="info">
          <h4 className="mb-4">Welcome to your dashboard!</h4>
          <span className="text-sm">
            Use the right button to seed some predefined data. Each step must be completed in order.
          </span>
        </Banner>
        {error && (
          <Banner type="error" className="my-4">
            {error}
          </Banner>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {current && (
          <SeedButton
            label={loading ? current.loadingLabel : current.label}
            onClick={current.handler}
            disabled={loading}
          />
        )}
        {!current && (
          <Button buttonStyle="primary" onClick={() => setCurrentStep(0)}>
            Reset Steps
          </Button>
        )}
      </div>
    </div>
  );
}

const SeedButton = ({
  label,
  onClick,
  disabled,
}: { label: string; onClick: () => void; disabled: boolean }) => (
  <Button buttonStyle="primary" onClick={onClick} disabled={disabled}>
    {label}
  </Button>
);
