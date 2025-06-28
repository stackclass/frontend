import UserCourseService from "@/services/user-course";
import { CreateUserCourseRequest, UserCourse } from "@/types/course";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

/**
 * Fetch all user courses.
 */
export const useUserCourses = (
  options?: UseQueryOptions<AxiosResponse<UserCourse[]>>,
) => {
  return useQuery<AxiosResponse<UserCourse[]>>({
    queryKey: ["userCourses"],
    queryFn: () => UserCourseService.findUserCourses(),
    ...options,
  });
};

/**
 * Enroll the current user in a course.
 */
export const useCreateUserCourse = (
  options?: UseMutationOptions<
    AxiosResponse<UserCourse>,
    Error,
    CreateUserCourseRequest
  >,
) => {
  return useMutation<AxiosResponse<UserCourse>, Error, CreateUserCourseRequest>(
    {
      mutationFn: (data) => UserCourseService.createUserCourse(data),
      ...options,
    },
  );
};

/**
 * Fetch details of a specific user course.
 * @param slug - The slug of the course.
 */
export const useUserCourse = (
  slug: string,
  options?: UseQueryOptions<AxiosResponse<UserCourse>>,
) => {
  return useQuery<AxiosResponse<UserCourse>>({
    queryKey: ["userCourse", slug],
    queryFn: () => UserCourseService.getUserCourse(slug),
    ...options,
  });
};
