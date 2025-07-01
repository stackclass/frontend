export interface Course {
  /// Unique human-readable identifier
  slug: string;

  /// Full course name
  name: string;

  /// Short display name
  short_name: string;

  /// Release status (alpha/beta/live)
  release_status: string;

  /// Brief summary
  summary: string;

  /// URL or path to the course logo
  logo: string;

  /// Number of stages in the course
  stage_count: number;

  /// Creation timestamp
  created_at: string;

  /// Last update timestamp
  updated_at: string;
}

export interface CourseDetail extends Course {
  /// Detailed description
  description: string;
}

export interface UserCourse {
  /// Slug of the enrolled course
  course_slug: string;

  /// Timestamp when the enrollment started
  started_at: string;

  /// Slug of the current stage the user is on
  current_stage_slug?: string;

  /// Number of stages completed by the user
  completed_stage_count: number;

  /// Language proficiency level of the user
  proficiency: string | null;

  /// Practice cadence of the user
  cadence: string | null;

  /// Whether the user wants accountability emails
  accountability: boolean | null;

  /// Whether the first Git push was received
  activated: boolean;

  /// The git repository URL of the user course
  repository: string;
}

export interface CreateCourseRequest {
  /// The git repository URL of the course
  repository: string;
}

export interface CreateUserCourseRequest {
  /// The slug of the course to enroll in
  course_slug: string;

  /// Language proficiency level of the user
  proficiency: string;

  /// Practice cadence of the user
  cadence: string;

  /// Whether the user wants accountability emails
  accountability: boolean;
}

export interface UpdateUserCourseRequest {
  /// Language proficiency level of the user
  proficiency: string;

  /// Practice cadence of the user
  cadence: string;

  /// Whether the user wants accountability emails
  accountability: boolean;
}
