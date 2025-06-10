"use client";

import { Fragment, useCallback, useState } from "react";
import { toast, Button } from "@payloadcms/ui";

export const SeedButton = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [seeded, setSeeded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(
    async (e: React.MouseEvent<Element, MouseEvent>) => {
      e.preventDefault();

      if (seeded) {
        toast.info("Database already seeded.");
        return;
      }
      if (loading) {
        toast.info("Seeding already in progress.");
        return;
      }
      if (error) {
        toast.error(`An error occurred, please refresh and try again.`);
        return;
      }

      setLoading(true);

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch("/next/seed", {
                method: "POST",
                credentials: "include",
              })
                .then((res) => {
                  if (res.ok) {
                    resolve(true);
                    setSeeded(true);
                  } else {
                    reject("An error occurred while seeding.");
                  }
                })
                .catch((error) => {
                  reject(error);
                });
            } catch (error) {
              reject(error);
            }
          }),
          {
            loading: "Seeding with data....",
            success: "Database seeded successfully.",
            error: "An error occurred while seeding.",
          },
        );
      } catch (err) {
        setError(typeof err === "string" ? err : "An error occurred while seeding.");
      }
    },
    [loading, seeded, error],
  );

  let message: string | null = null;
  if (loading) message = "Seeding...";
  if (seeded) message = "Done!";
  if (error) message = `Error: ${error}`;

  return (
    <Fragment>
      <Button buttonStyle="primary" onClick={handleClick}>
        {message ? message : "Seed your database"}
      </Button>
    </Fragment>
  );
};
