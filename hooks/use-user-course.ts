import UserCourseService from "@/services/user-course";
import { CreateUserCourseRequest, UserCourse } from "@/types/course";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Fetch all user courses.
 */
export const useUserCourses = (options?: UseQueryOptions<UserCourse[]>) => {
  return useQuery<UserCourse[]>({
    queryKey: ["userCourses"],
    queryFn: () => UserCourseService.findUserCourses().then((res) => res.data),
    ...options,
  });
};

/**
 * Enroll the current user in a course.
 */
export const useCreateUserCourse = (
  options?: UseMutationOptions<UserCourse, Error, CreateUserCourseRequest>,
) => {
  return useMutation<UserCourse, Error, CreateUserCourseRequest>({
    mutationFn: (data) =>
      UserCourseService.createUserCourse(data).then((res) => res.data),
    ...options,
  });
};

/**
 * Fetch details of a specific user course.
 * @param slug - The slug of the course.
 */
export const useUserCourse = (
  slug: string,
  options?: UseQueryOptions<UserCourse>,
) => {
  return useQuery<UserCourse>({
    queryKey: ["userCourse", slug],
    queryFn: () =>
      UserCourseService.getUserCourse(slug).then((res) => res.data),
    ...options,
  });
};
