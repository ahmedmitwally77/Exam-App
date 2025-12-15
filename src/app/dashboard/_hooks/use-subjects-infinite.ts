"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubjectsByPage } from "../_services/get-subjects.service";

export const useSubjectsInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["subjects-infinite"],
    queryFn: ({ pageParam = 1 }) => getSubjectsByPage(pageParam),
    getNextPageParam: (lastPage) => {
      if ("code" in lastPage) return undefined;
      const { currentPage, numberOfPages } = lastPage.metadata;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
