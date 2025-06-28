import ExtensionService from "@/services/extension";
import { Extension } from "@/types/extension";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

/**
 * Hook for fetching all extensions for a course.
 * @param slug - The course slug.
 * @param options - Optional react-query options.
 */
export const useExtensions = (
  slug: string,
  options?: UseQueryOptions<Extension[]>,
) => {
  return useQuery<Extension[]>({
    queryKey: ["extensions", slug],
    queryFn: () =>
      ExtensionService.findAllExtensions(slug).then((res) => res.data),
    ...options,
  });
};
