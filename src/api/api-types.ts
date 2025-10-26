// Add types for api functions (Request & Response) here...
import { AxiosRequestConfig, Method } from "axios";

export type Country = {
  name: string;
  code: string;
  flag: string;
};

export interface ApiConfig<T = any> {
  url: string;
  method?: Method;
  payload?: Partial<T>;
  params?: Record<string, any>;
  rest?: Omit<AxiosRequestConfig, "url" | "method" | "data" | "params">;
}

export interface LoginRequest {
  identifier?: string;
  password?: string;
  email?: string;
}

export interface LoginResponseData {
  id: string;
  email: string;
  profileImage: string;
  userName: string;
}
export interface LoginRequestTypes {
  identifier?: string;
  password?: string;
  email?: string;
}
export interface ResponseTypes {
  [x: string]: any;
  user_id: any;
  name: any;
  error: string;
  status: boolean;
  user: any;
  username: any;
  jwt: string;
  userName: string;
  email: string;
  id: string;
  message: string;
  data: LoginResponseData;
  success: string;
}
