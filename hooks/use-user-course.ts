import UserCourseService from "@/services/user-course";
import {
  CreateUserCourseRequest,
  UpdateUserCourseRequest,
  UserCourse,
} from "@/types/course";
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
 * Update a user course.
 * @param slug - The slug of the course.
 * @param options - Optional mutation options.
 */
export const useUpdateUserCourse = (
  slug: string,
  options?: UseMutationOptions<void, Error, UpdateUserCourseRequest>,
) => {
  return useMutation<void, Error, UpdateUserCourseRequest>({
    mutationFn: (data) =>
      UserCourseService.updateUserCourse(slug, data).then((res) => res.data),
    ...options,
  });
};

/**
 * Fetch details of a specific user course.
 * @param slug - The slug of the course.
 */
export const useUserCourse = (
  slug: string,
  options?: Omit<UseQueryOptions<UserCourse>, "queryKey">,
) => {
  return useQuery<UserCourse>({
    queryKey: ["userCourse", slug],
    queryFn: () =>
      UserCourseService.getUserCourse(slug).then((res) => res.data),
    ...options,
  });
};
