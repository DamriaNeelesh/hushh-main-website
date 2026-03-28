"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", metric.name, {
      event_category: metric.label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      event_label: metric.id,
      non_interaction: true,
      value: typeof metric.value === "number" ? Math.round(metric.value) : undefined,
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      metric_navigation_type: metric.navigationType,
    });
  });

  return null;
}
