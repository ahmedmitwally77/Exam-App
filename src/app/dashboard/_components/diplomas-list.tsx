"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSubjectsInfinite } from "../_hooks/use-subjects-infinite";
import { Subject } from "@/lib/types/subjects";
import { Loader2 } from "lucide-react";
import { ErrorMessage } from "@/components/ui/error-message";

export default function DiplomasList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useSubjectsInfinite();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <ErrorMessage
          message={
            error instanceof Error
              ? error.message
              : "An error occurred while loading data "
          }
        />
      </div>
    );
  }

  const allSubjects =
    data?.pages.flatMap((page) => {
      if ("code" in page) return [];
      return page.subjects;
    }) || [];

  return (
    <>
      <InfiniteScroll
        dataLength={allSubjects.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          isFetchingNextPage ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : null
        }
        endMessage={
          <div className="text-center p-4">
            <p className="text-sm lg:text-base text-gray-600 font-geistMono">
              No more diplomas available
            </p>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[2.5rem] mb-6">
          {allSubjects.map((diploma: Subject) => (
            <Link
              href={`dashboard/exams/`}
              key={diploma._id}
              className="group relative w-full max-w-[21rem] mx-auto h-[28rem] cursor-pointer overflow-hidden transition-shadow duration-300"
            >
              <Image
                src={diploma.icon}
                alt={diploma.name}
                width={336}
                height={448}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute bottom-3 left-3 right-3 p-4 bg-[#155DFC80] hover:bg-blue-600 duration-300 transition-colors text-white backdrop-blur-[6px]`}
              >
                <h3
                  title={diploma.name}
                  className="text-xl font-semibold font-geistMono line-clamp-1"
                >
                  {diploma.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>

      {/* Scroll to view more - shown initially when there's more data */}
      {hasNextPage && (
        <div className="text-center p-[0.6rem]">
          <p className="text-sm lg:text-base text-gray-600 mb-2 font-geistMono">
            Scroll to view more
          </p>
          <div className="flex justify-center">
            <svg
              className="w-5 h-5 text-gray-600 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
