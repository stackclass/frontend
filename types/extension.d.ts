export interface Extension {
  /// Unique identifier within course
  slug: string;

  /// Extension name
  name: string;

  /// Extension description
  description: string;

  /// Creation timestamp
  createdAt: string;

  /// Last update timestamp
  updatedAt: string;
}
