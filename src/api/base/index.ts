import axios from "axios";
import { toast } from "react-toastify";
import { ApiConfig } from "../api-types";
import { store } from "@/redux/store";

// REST API Client (Default)
const restApiClient = axios.create({
  baseURL: 'https://ribbon-backend.vercel.app/api',
});
restApiClient.interceptors.request.use((config) => {
  const token = store.getState()?.auth?.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// AI API Client
const xeroApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_XERO_API_BASE_URL,
});

export const api = async <T, R = any>({
  url,
  method = "get",
  payload = {},
  params = {},
  rest = {},
  apiType = "rest", // Default value is 'rest'
}: ApiConfig<T> & { apiType?: "rest" | "xero" }): Promise<R> => {
  try {
    const headers = rest.headers || {};

    // By default, REST API will be used unless 'apiType' is set to 'ai'
    const axiosInstance = apiType === "xero" ? xeroApiClient : restApiClient;

    let response;

    if (method.toLowerCase() === "post") {
      response = await axiosInstance.post(url, payload, {
        params,
        headers,
        ...rest,
      });
    } else {
      response = await axiosInstance({
        url,
        method,
        data: payload,
        params,
        headers,
        ...rest,
      });
    }

    return response?.data as R;
  } catch (error: any) {
    console.log("🚀 ~ callApi ~ error:", error);
    if (error?.code === "ERR_NETWORK") {
      toast?.error("Network error");
    }

    throw error;
  }
};
