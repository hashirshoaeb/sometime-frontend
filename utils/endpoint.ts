export type EndpointType = "auth-send" | "auth-verify" | "event";

export const Endpoint: Record<
  EndpointType,
  string | ((...args: string[]) => string)
> = {
  "auth-send": "auth/send",
  "auth-verify": "auth/verify",
  event: "/event",
};
