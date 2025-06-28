import CourseService from "@/services/course";
import { Course, CourseDetail, CreateCourseRequest } from "@/types/course";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Hook for fetching all courses.
 */
export const useFindCourses = (
  options?: UseQueryOptions<AxiosResponse<Course[]>>,
) => {
  return useQuery<AxiosResponse<Course[]>>({
    queryKey: ["courses"],
    queryFn: () => CourseService.find(),
    ...options,
  });
};

/**
 * Hook for creating a new course.
 */
export const useCreateCourse = (
  options?: UseMutationOptions<
    AxiosResponse<Course>,
    unknown,
    CreateCourseRequest
  >,
) => {
  return useMutation<AxiosResponse<Course>, unknown, CreateCourseRequest>({
    mutationFn: (data) => CourseService.create(data),
    ...options,
  });
};

/**
 * Hook for fetching a course by slug.
 */
export const useGetCourse = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<CourseDetail>>,
) => {
  return useQuery<AxiosResponse<CourseDetail>>({
    queryKey: ["course", slug],
    queryFn: () => CourseService.get(slug),
    ...options,
  });
};

/**
 * Hook for deleting a course by slug.
 */
export const useDeleteCourse = (
  options?: UseMutationOptions<AxiosResponse<void>, unknown, string>,
) => {
  return useMutation<AxiosResponse<void>, unknown, string>({
    mutationFn: (slug) => CourseService.delete(slug),
    ...options,
  });
};

/**
 * Hook for updating a course from git repository.
 */
export const useUpdateCourse = (
  options?: UseMutationOptions<AxiosResponse<Course>, unknown, string>,
) => {
  return useMutation<AxiosResponse<Course>, unknown, string>({
    mutationFn: (slug) => CourseService.update(slug),
    ...options,
  });
};
