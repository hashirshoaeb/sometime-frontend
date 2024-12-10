// add .env.development and .env.production files to the root of the project
// to set the environment variables
// .env.development when running npm run dev
// .env.production when running npm run build && npm run start
export interface IEnvironment {
  env: "production" | "development" | "test";
  baseUrl: string;
  apiBaseUrl: string;
  publicApiBaseUrl: string;
}
