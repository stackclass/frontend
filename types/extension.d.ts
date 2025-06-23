export interface Extension {
  /// Unique identifier within course
  slug: string;

  /// Extension name
  name: string;

  /// Extension description
  description: string;

  /// Number of stages in the extension
  stage_count: number;

  /// Creation timestamp
  createdAt: string;

  /// Last update timestamp
  updatedAt: string;
}
