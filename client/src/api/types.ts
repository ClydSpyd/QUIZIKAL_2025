/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any>{
  data?:T;
  error?: string;
}

export interface ErrorResponse {
  error: string; // Match the structure of your API's error response
}