import { SeedButton } from "./seed-button";
import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

export default function BeforeDashboard() {
  return (
    <div className="flex justify-between p-4 items-center">
      <Banner type="success">
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <SeedButton />
    </div>
  );
}
