"use server";

import { QueryParams } from "@/types/QueryParams";
import { Endpoint, EndpointType } from "./endpoint";
import { environment } from "./environment/serverEnvironment";

export async function getEndpoint({
  queryParams = {},
  pathParams = [],
  ...props
}: {
  endpoint: EndpointType;
  pathParams?: string[];
  queryParams: QueryParams;
  version: "v1";
}) {
  const baseUrl = environment.apiBaseUrl;
  const endpointValue = Endpoint[props.endpoint];
  let apiUrl: URL;
  if (typeof endpointValue === "string") {
    apiUrl = new URL(`${baseUrl}/${props.version}/api/${endpointValue}`);
  } else if (typeof endpointValue === "function") {
    apiUrl = new URL(
      `${baseUrl}/${props.version}/api/${endpointValue(...pathParams)}`
    );
  } else {
    throw new Error("Invalid endpoint");
  }
  // Append query parameters if any
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined) {
      apiUrl.searchParams.append(key, String(value));
    }
  });
  return apiUrl.toString();
}
