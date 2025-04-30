export interface ApiResponse<T> {
    isSuccess: number; // 1 for success, 0 for failure
    showMessage: number; // 1 to show a message, 0 to hide
    message: {
      typeId: number; // Type of message (e.g., success, error, warning)
      text: string; // Message text
    };
    data: T; // Generic type for the data payload
    code: number; // HTTP status code
  }