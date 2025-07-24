import CourseService from "@/services/course";
import { Attempt } from "@/types/attempt";
import { Course, CourseDetail, CreateCourseRequest } from "@/types/course";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Hook for fetching all courses.
 */
export const useFindCourses = (options?: UseQueryOptions<Course[]>) => {
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: () => CourseService.find().then((res) => res.data),
    ...options,
  });
};

/**
 * Hook for creating a new course.
 */
export const useCreateCourse = (
  options?: UseMutationOptions<Course, unknown, CreateCourseRequest>,
) => {
  return useMutation<Course, unknown, CreateCourseRequest>({
    mutationFn: (data) => CourseService.create(data).then((res) => res.data),
    ...options,
  });
};

/**
 * Hook for fetching a course by slug.
 */
export const useGetCourse = (
  slug: string,
  options?: UseQueryOptions<CourseDetail>,
) => {
  return useQuery<CourseDetail>({
    queryKey: ["course", slug],
    queryFn: () => CourseService.get(slug).then((res) => res.data),
    ...options,
  });
};

/**
 * Hook for deleting a course by slug.
 */
export const useDeleteCourse = (
  options?: UseMutationOptions<void, unknown, string>,
) => {
  return useMutation<void, unknown, string>({
    mutationFn: (slug) => CourseService.delete(slug).then((res) => res.data),
    ...options,
  });
};

/**
 * Hook for updating a course from git repository.
 */
export const useUpdateCourse = (
  options?: UseMutationOptions<Course, unknown, string>,
) => {
  return useMutation<Course, unknown, string>({
    mutationFn: (slug) => CourseService.update(slug).then((res) => res.data),
    ...options,
  });
};

/**
 * Hook for fetching all attempts for a course.
 * @param slug - The course slug.
 * @param options - Optional react-query options.
 */
export const useAttempts = (
  slug: string,
  options?: UseQueryOptions<Attempt[]>,
) => {
  return useQuery<Attempt[]>({
    queryKey: ["attempts", slug],
    queryFn: () => CourseService.findAttempts(slug).then((res) => res.data),
    ...options,
  });
};
