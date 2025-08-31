"use client";

import { Attempt } from "@/types/attempt";
import { CourseDetail, UserCourse } from "@/types/course";
import { StageWithState } from "@/types/stage";
import { create } from "zustand";

interface CourseStore {
  // State
  course: CourseDetail | null;
  userCourse: UserCourse | null;
  stages: StageWithState[];
  attempts: Attempt[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCourse: (course: CourseDetail) => void;
  setUserCourse: (userCourse: UserCourse) => void;
  setStages: (stages: StageWithState[]) => void;
  setAttempts: (attempts: Attempt[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  // Initial state
  course: null,
  userCourse: null,
  stages: [],
  attempts: [],
  isLoading: false,
  error: null,

  // Actions
  setCourse: (course) => set({ course }),
  setUserCourse: (userCourse) => set({ userCourse }),
  setStages: (stages) => set({ stages }),
  setAttempts: (attempts) => set({ attempts }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      course: null,
      userCourse: null,
      stages: [],
      attempts: [],
      isLoading: false,
      error: null,
    }),
}));

// Helper hook to check if user course is new
export const useIsNewUserCourse = () => {
  const userCourse = useCourseStore((state) => state.userCourse);
  return !userCourse || userCourse.proficiency === null;
};
