"use client";

import { useReportWebVitals } from "next/web-vitals";

export const WebVitals = () => {
  useReportWebVitals((metric) => {
    // TODO: send to analytics
    console.log(metric);
  });

  return null;
};
