import ExtensionService from "@/services/extension";
import { Extension } from "@/types/extension";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Hook for fetching all extensions for a course.
 * @param slug - The course slug.
 * @param options - Optional react-query options.
 */
export const useExtensions = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<Extension[]>>,
) => {
  return useQuery<AxiosResponse<Extension[]>>({
    queryKey: ["extensions", slug],
    queryFn: () => ExtensionService.findAllExtensions(slug),
    ...options,
  });
};
