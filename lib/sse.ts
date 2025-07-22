type EventHandler<T> = (event: T) => void;
type ErrorHandler = (error: Error) => void;

class SSEClient {
  private static instances: Record<string, SSEClient> = {};
  private eventSource: EventSource | null = null;
  private messageHandlers: Set<EventHandler<unknown>> = new Set();
  private errorHandlers: Set<ErrorHandler> = new Set();
  private static baseURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  private constructor() {}

  /**
   * Get or create an SSE client instance
   * @param key Unique identifier to distinguish different SSE connections
   */
  public static getInstance(key: string): SSEClient {
    if (!this.instances[key]) {
      this.instances[key] = new SSEClient();
    }
    return this.instances[key];
  }

  /**
   * Handle errors that occur during SSE connection or message processing
   * @param error The error that occurred (can be an Event or Error)
   */
  private handleError(error: Event | Error): void {
    const normalizedError =
      error instanceof Error ? error : new Error("SSE connection error");
    this.errorHandlers.forEach((handler) => handler(normalizedError));
  }

  /**
   * Build the full URL for SSE subscription, including token if available
   * @param relativeUrl The relative URL path
   * @returns The full URL with token if applicable
   */
  private buildFullUrl(relativeUrl: string): string {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    return `${SSEClient.baseURL}${relativeUrl}${token ? `?token=${encodeURIComponent(token)}` : ""}`;
  }

  /**
   * Subscribe to SSE events
   * @param relativeUrl Relative path (will automatically include baseURL)
   * @param onMessage Message handler callback
   * @param onError Error handler callback
   */
  public subscribe<T>(
    relativeUrl: string,
    onMessage: EventHandler<T>,
    onError?: ErrorHandler,
  ): void {
    this.messageHandlers.add(onMessage as EventHandler<unknown>);
    if (onError) this.errorHandlers.add(onError);

    // If already connected, no need to connect again
    if (this.eventSource) return;

    // Create a new EventSource instance with the full URL
    this.eventSource = new EventSource(this.buildFullUrl(relativeUrl));

    // Set up event listeners
    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageHandlers.forEach((handler) => handler(data));
      } catch (err) {
        this.handleError(
          err instanceof Error
            ? err
            : new Error(`Failed to parse SSE data: ${String(err)}`),
        );
      }
    };

    this.eventSource.onerror = (event) => {
      this.handleError(event);
      this.cleanup();
    };
  }

  /**
   * Unsubscribe from SSE events
   * @param onMessage Message handler callback to remove
   */
  public unsubscribe<T>(onMessage: EventHandler<T>): void {
    this.messageHandlers.delete(onMessage as EventHandler<unknown>);
    if (this.messageHandlers.size === 0) {
      this.cleanup();
    }
  }

  /**
   * Close all SSE connections
   */
  public static closeAll(): void {
    Object.values(this.instances).forEach((instance) => instance.cleanup());
    this.instances = {};
  }

  /**
   * Clean up resources and reset state
   */
  private cleanup(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.messageHandlers.clear();
    this.errorHandlers.clear();
  }
}

export default SSEClient;
