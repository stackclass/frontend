export interface Stage {
  /// Unique human-readable identifier within parent context
  slug: string;

  /// Optional reference to parent extension (null if part of main course)
  extension_slug?: string;

  /// Display name of the stage
  name: string;

  /// Difficulty level (very_easy, easy, medium, hard)
  difficulty: Difficulty;

  /// A short markdown description of the stage,
  /// used in the course overview page.
  description: string;

  /// Creation timestamp
  created_at: string;

  /// Last update timestamp
  updated_at: string;
}

export type Difficulty = "very_easy" | "easy" | "medium" | "hard";

export interface StageDetail extends Stage {
  /// A markdown description for this stage.
  instruction: string;

  /// The solution to this stage, if available.
  solution?: Solution;
}

export interface Solution {
  /// Detailed description of the solution approach and logic
  explanation: string;

  /// Collection of file changes needed to implement this solution
  /// Stored as tuples of (file_path, patch_content)
  patches: [string, string][];
}

export interface UserStage {
  /// Slug of the enrolled course
  course_slug: string;

  /// Slug of the stage
  stage_slug: string;

  /// Current progress status (in_progress, completed)
  status: string;

  /// Timestamp when the stage was started
  started_at: string;

  /// Timestamp when the stage was completed
  completed_at?: string;
}
