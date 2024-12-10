"use server";

import { QueryParams } from "@/types/QueryParams";
import { Endpoint } from "./endpoint";
import { environment } from "./environment/serverEnvironment";

export async function getEndpoint({ queryParams = {}, ...props }: { endpoint: keyof typeof Endpoint, queryParams: QueryParams, version: "v1" }) {
  const baseUrl = environment.apiBaseUrl;
  const apiUrl = new URL(`${baseUrl}/${props.version}/api/${Endpoint[props.endpoint]}`);
  // Append query parameters if any
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, String(value));
    }
  });
  return apiUrl.toString();
}