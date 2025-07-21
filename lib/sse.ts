import http from "@/lib/http";
import { AxiosError } from "axios";
import { Readable } from "stream";

type EventHandler<T> = (event: T) => void;
type ErrorHandler = (error: Error) => void;

class SSEClient {
  private static instances: Record<string, SSEClient> = {};
  private abortController: AbortController | null = null;
  private eventSource: Readable | null = null;
  private messageHandlers: Set<EventHandler<unknown>> = new Set();
  private errorHandlers: Set<ErrorHandler> = new Set();

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
   * @param error The error that occurred, can be any type (Error, string, etc.)
   */
  private handleError(error: unknown): void {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));

    this.errorHandlers.forEach((handler) => handler(normalizedError));
  }

  /**
   * Subscribe to SSE events
   * @param url Relative path (will automatically include baseURL)
   * @param onMessage Message handler callback
   * @param onError Error handler callback
   */
  public async subscribe<T>(
    url: string,
    onMessage: EventHandler<T>,
    onError?: ErrorHandler,
  ): Promise<void> {
    this.messageHandlers.add(onMessage as EventHandler<unknown>);
    if (onError) this.errorHandlers.add(onError);

    // If already connected, no need to connect again
    if (this.eventSource) return;

    this.abortController = new AbortController();

    try {
      const response = await http.get<Readable>(url, {
        responseType: "stream",
        signal: this.abortController.signal,
        headers: {
          Accept: "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });

      this.eventSource = response.data;
      this.setupEventSourceListeners();
    } catch (error) {
      if (!this.abortController?.signal.aborted) {
        const err = error as AxiosError;
        this.handleError(new Error(`SSE connection failed: ${err.message}`));
      }
      this.cleanup();
    }
  }

  /**
   * Set up event listeners for the SSE connection
   */
  private setupEventSourceListeners(): void {
    if (!this.eventSource) return;

    this.eventSource.on("data", (chunk: Buffer) => {
      try {
        const data = chunk.toString();
        const eventData = this.parseSSEData(data);
        if (eventData) {
          this.messageHandlers.forEach((handler) => handler(eventData));
        }
      } catch (err) {
        this.handleError(err);
      }
    });

    this.eventSource.on("error", (err: Error) => {
      this.handleError(err);
      this.cleanup();
    });

    this.eventSource.on("end", () => {
      this.cleanup();
    });
  }

  /**
   * Parse raw SSE data string into usable data
   * @param data The raw SSE data string received from the server
   * @returns Parsed data object if successful, null if no data or parsing failed
   *
   * SSE data format is typically:
   * data: {"key": "value"}\n\n
   * This method extracts and parses the JSON portion
   */
  private parseSSEData(data: string): unknown | null {
    const lines = data.split("\n");
    for (const line of lines) {
      if (line.startsWith("data:")) {
        const eventData = line.replace("data:", "").trim();
        if (eventData) {
          try {
            return JSON.parse(eventData);
          } catch (err) {
            this.handleError(
              new Error(
                `Failed to parse SSE data: ${err instanceof Error ? err.message : String(err)}`,
              ),
            );
            return null;
          }
        }
      }
    }
    return null;
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
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.eventSource) {
      this.eventSource.destroy();
      this.eventSource = null;
    }
    this.messageHandlers.clear();
    this.errorHandlers.clear();
  }
}

export default SSEClient;
