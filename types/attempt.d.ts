export interface Attempt {
  /// The unique identifier of the user
  user_id: string;

  /// URL of the user's avatar image
  avatar: string;

  /// The display name of the user
  username: string;

  /// Number of tasks completed by the user
  completed: number;

  /// Total number of tasks available
  total: number;
}
