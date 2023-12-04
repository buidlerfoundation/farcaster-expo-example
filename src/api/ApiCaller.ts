import AppConfig from "@/common/AppConfig";
import { BaseDataApi } from "@/models";

const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const METHOD_DELETE = "delete";
const METHOD_PATCH = "patch";

const logger = (...arg) => {
  if (__DEV__) {
    console.log(...arg);
  }
};

async function requestAPI<T = any>(
  method: string,
  uri: string,
  body?: any,
  serviceBaseUrl?: string,
  controller?: AbortController,
  h?: any,
  withoutError?: boolean
): Promise<BaseDataApi<T>> {
  let apiUrl = "";
  if (serviceBaseUrl) {
    apiUrl = serviceBaseUrl + uri;
  } else {
    apiUrl = AppConfig.baseUrl + uri;
  }
  // Build API header
  let headers: any = {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    api_key: process.env.EXPO_PUBLIC_NEYNAR_API_KEY,
  };
  if (body instanceof FormData) {
    // headers['Content-Type'] = 'multipart/form-data';
    // headers = {};
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (h) {
    headers = {
      ...headers,
      ...h,
    };
  }

  // Build API body
  let contentBody: any = null;
  if (
    method.toLowerCase() === METHOD_POST ||
    method.toLowerCase() === METHOD_PUT ||
    method.toLowerCase() === METHOD_DELETE ||
    method.toLowerCase() === METHOD_PATCH
  ) {
    if (body) {
      if (body instanceof FormData) {
        contentBody = body;
      } else {
        contentBody = JSON.stringify(body);
      }
    }
  }
  // Construct fetch options
  const fetchOptions: RequestInit = { method, headers, body: contentBody };
  if (controller) {
    fetchOptions.signal = controller.signal;
  }
  const reqTime = new Date().getTime();
  logger("Request: ", {
    apiUrl,
    reqTime,
    fetchOptions,
  });
  return fetch(apiUrl, fetchOptions)
    .then((res) => {
      return res
        .json()
        .then(async (data) => {
          const resTime = new Date().getTime();
          logger("Response: ", {
            apiUrl,
            data,
            resTime,
            time: resTime - reqTime,
          });
          if (res.status !== 200) {
            // alert error
          }
          if (data.data) {
            return {
              ...data,
              statusCode: res.status,
              success: res.status === 200,
            };
          }
          if (data.success || data.message) {
            return {
              data: data.data,
              success: data.success,
              message: data.message,
              statusCode: res.status,
            };
          }
          return { data, statusCode: res.status, success: res.status === 200 };
        })
        .catch((err) => {
          return { message: err, statusCode: res.status };
        });
    })
    .catch((err) => {
      const msg = err.message || err;
      if (!msg.includes("aborted")) {
        // alert error
      }
      return {
        message: msg,
      };
    });
}

const ApiCaller = {
  get<T>(
    url: string,
    baseUrl?: string,
    controller?: AbortController,
    h?: any,
    withoutError?: boolean
  ) {
    return requestAPI<T>(
      METHOD_GET,
      url,
      undefined,
      baseUrl,
      controller,
      h,
      withoutError
    );
  },

  post<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController,
    h?: any
  ) {
    return requestAPI<T>(METHOD_POST, url, data, baseUrl, controller, h);
  },

  patch<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_PATCH, url, data, baseUrl, controller);
  },

  put<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_PUT, url, data, baseUrl, controller);
  },

  delete<T>(
    url: string,
    data?: any,
    baseUrl?: string,
    controller?: AbortController
  ) {
    return requestAPI<T>(METHOD_DELETE, url, data, baseUrl, controller);
  },
};

export default ApiCaller;
