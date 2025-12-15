"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function PageBreadcrumb() {
  const pathname = usePathname(); // e.g., /dashboard/account/change-password

  if (!pathname) return null;

  // Get segments
  let segments = pathname.split("/").filter(Boolean); // ["dashboard", "account", "change-password"]
  segments = segments.filter((seg) => seg !== "dashboard"); // Remove 'dashboard' segment => ["account", "change-password"]

  // Replace exam ID with "Questions"
  const processedSegments = segments.map((seg, index) => {
    // If previous segment is "exams" and current looks like an ID (long alphanumeric)
    if (index > 0 && segments[index - 1] === "exams" && seg.length > 10) {
      return "questions";
    }
    return seg;
  });

  // Add Home at the beginning
  const pathes = ["Home", ...processedSegments]; // ["Home", "account", "change-password"]

  // Helper functions to convert cable-case to Title Case
  const autoFormat = (str: string) =>
    str
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Helper functions to get title
  const getTitle = (item: string) => {
    if (item === "Home") return "Home";
    return autoFormat(item);
  };

  // Helper functions to get href
  const getHref = (item: string, index: number) => {
    if (item === "Home") return "/";
    if (index === 0) return "/";
    // Build path from original segments (not processed), up to current index
    const segmentsUpToHere = segments.slice(0, index);
    return "/dashboard/" + segmentsUpToHere.join("/");
  };

  return (
    <div className="p-3 lg:p-4 bg-white BreadcrumbContainer">
      <Breadcrumb aria-label="Page Breadcrumb">
        <BreadcrumbList>
          {pathes.map((item, index) => {
            const isLast = index === pathes.length - 1;
            const title = getTitle(item);
            const href = getHref(item, index);

            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="font-geistMono text-xs lg:text-sm"
                    asChild
                  >
                    <Link
                      className={
                        isLast
                          ? "text-blue-500 hover:text-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                      }
                      href={href}
                    >
                      {title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
