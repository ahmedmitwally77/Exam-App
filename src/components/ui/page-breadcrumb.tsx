"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TPathes = string[];

export default function PageBreadcrumb() {
  const [isActive, setIsActive] = useState<string>("");
  const pathes: TPathes = location.pathname
    .split("/")
    .filter(Boolean)
    .filter((item) => item.toLowerCase() !== "dashboard");
  pathes.unshift("Home");

  useEffect(() => {
    setIsActive(pathes[pathes.length - 1].toLowerCase());
  }, [pathes]);

  return (
    <div className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          {pathes.map((item, index) => {
            const isLast = index === pathes.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink className="font-geistMono text-sm" asChild>
                    <Link
                      className={
                        isActive === item.toLowerCase()
                          ? "text-blue-500 hover:text-blue-600"
                          : "text-gray-400 hover:text-blue-600"
                      }
                      href={item === "Home" ? "/" : item.toLowerCase() || "#"}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
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
