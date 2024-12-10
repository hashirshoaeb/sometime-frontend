import { QueryParams } from "@/types/QueryParams";
import { Endpoint } from "./endpoint";
import { getEndpoint } from "./getEndpoint";
import { Exception } from "./exceptions";
import println from "./print";


type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';


interface FetchOptions extends RequestInit {
  method?: RequestMethod;
  data?: any;
}

class FetchWrapper {
  constructor() { }

  private async request({ endpoint, queryParams = {}, options = {} }: { endpoint: keyof typeof Endpoint, queryParams: QueryParams, options?: FetchOptions }) {
    const completeUrl = await getEndpoint({ endpoint: endpoint, queryParams: queryParams, version: 'v1' });
    const { method = 'GET', data, headers = {}, ...restOptions } = options;
    const response = await fetch(completeUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method !== 'GET' && data ? JSON.stringify(data) : undefined,
      ...restOptions,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Exception(errorData);
    }

    return await response.json();
  }

  get({ endpoint, queryParams = {}, options, }: { endpoint: keyof typeof Endpoint, queryParams?: QueryParams, options?: Omit<FetchOptions, 'method' | 'data'> }) {
    return this.request({ endpoint: endpoint, queryParams: queryParams, options: { method: 'GET', ...options } });
  }

  post({ endpoint, data, options }: { endpoint: keyof typeof Endpoint, data: any, options?: Omit<FetchOptions, 'method' | 'data'> }) {
    return this.request({ endpoint: endpoint, queryParams: {}, options: { method: 'POST', data, ...options } });
  }

  put({ endpoint, data, options }: { endpoint: keyof typeof Endpoint, data: any, options?: Omit<FetchOptions, 'method' | 'data'> }) {
    return this.request({ endpoint: endpoint, queryParams: {}, options: { method: 'PUT', data, ...options } });
  }

  delete({ endpoint, options }: { endpoint: keyof typeof Endpoint, options?: Omit<FetchOptions, 'method' | 'data'> }) {
    return this.request({ endpoint: endpoint, queryParams: {}, options: { method: 'DELETE', ...options } });
  }

  async postMultipart({ endpoint, data, options = {} }: { endpoint: keyof typeof Endpoint, data: FormData, options?: Omit<FetchOptions, 'method' | 'data'> }) {
    const completeUrl = await getEndpoint({ endpoint: endpoint, queryParams: {}, version: 'v1' });
    const { headers = {}, ...restOptions } = options;

    const response = await fetch(completeUrl, {
      method: 'POST',
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