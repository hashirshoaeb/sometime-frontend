import { Exception } from "@/utils/exceptions";
import println from "@/utils/print";
import { Endpoint } from "./endpoint";
import { getEndpoint } from "./getEndpoint";
import { QueryParams } from "@/types/QueryParams";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  method?: RequestMethod;
  data?: any;
}

class FetchWrapper {
  constructor() {}

  private async request({
    endpoint,
    pathParams,
    queryParams = {},
    options = {},
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    queryParams: QueryParams;
    options?: FetchOptions;
  }) {
    const completeUrl = await getEndpoint({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: queryParams,
      version: "v1",
    });
    const { method = "GET", data, headers = {}, ...restOptions } = options;
    const response = await fetch(completeUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: method !== "GET" && data ? JSON.stringify(data) : undefined,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Exception(errorData);
    }

    return await response.json();
  }

  get({
    endpoint,
    pathParams,
    queryParams = {},
    options,
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    queryParams?: QueryParams;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    return this.request({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: queryParams,
      options: { method: "GET", ...options },
    });
  }

  post({
    endpoint,
    pathParams,
    data,
    options,
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    data: any;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    return this.request({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: {},
      options: { method: "POST", data, ...options },
    });
  }

  put({
    endpoint,
    pathParams,
    data,
    options,
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    data: any;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    return this.request({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: {},
      options: { method: "PUT", data, ...options },
    });
  }

  delete({
    endpoint,
    pathParams,
    data,
    options,
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    data: any;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    return this.request({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: {},
      options: { method: "DELETE", data, ...options },
    });
  }

  async postMultipart({
    endpoint,
    pathParams,
    data,
    options = {},
  }: {
    endpoint: keyof typeof Endpoint;
    pathParams?: string[];
    data: FormData;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    const completeUrl = await getEndpoint({
      endpoint: endpoint,
      pathParams: pathParams,
      queryParams: {},
      version: "v1",
    });
    const { headers = {}, ...restOptions } = options;

    const response = await fetch(completeUrl, {
      method: "POST",
      headers: {
        ...headers,
      },
      body: data,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json();
      println(errorData);
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  }

  async postMultipartPatch({
    endpoint,
    data,
    options = {},
  }: {
    endpoint: keyof typeof Endpoint;
    data: FormData;
    options?: Omit<FetchOptions, "method" | "data">;
  }) {
    const completeUrl = await getEndpoint({
      endpoint: endpoint,
      queryParams: {},
      version: "v1",
    });
    const { headers = {}, ...restOptions } = options;

    const response = await fetch(completeUrl, {
      method: "PATCH",
      headers: {
        ...headers,
      },
      body: data,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json();
      println(errorData);
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  }
}

// Export an instance with your base URL
export const fetchWrapper = new FetchWrapper();
