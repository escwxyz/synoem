export interface APIResponse<T = undefined> {
  status: "success" | "error";
  messageKey?: `api.${string}`;
  data?: T;
  error?: {
    code?: string;
    details?: unknown;
  };
}
