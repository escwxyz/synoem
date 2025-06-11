export interface APIResponse<T = undefined> {
  status: "success" | "error";
  messageKey?: `api.${string}` | `action.${string}`;
  data?: T;
  error?: {
    code?: string;
    details?: unknown;
  };
}
