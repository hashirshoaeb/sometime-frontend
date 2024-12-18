export type EndpointType = "auth-send" | "auth-verify";

export const Endpoint: Record<
  EndpointType,
  string | ((...args: string[]) => string)
> = {
  "auth-send": "auth/send",
  "auth-verify": "auth/verify",
};