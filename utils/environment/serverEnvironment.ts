import { IEnvironment } from "./environment";

export const environment: IEnvironment = {
  env: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL!,
  apiBaseUrl: process.env.API_URL!,
  publicApiBaseUrl: process.env.NEXT_PUBLIC_API_URL!,
};
