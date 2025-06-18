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

  /// Creation timestamp
  created_at: string;

  /// Last update timestamp
  updated_at: string;
}

export interface CourseDetail extends Course {
  /// Detailed description
  description: string;
}
