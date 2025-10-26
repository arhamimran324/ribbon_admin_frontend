import { LoginRequestTypes, ResponseTypes } from "@/api/api-types";
import { api } from "@/api/base";
import { RegisterValues } from "@/hooks/api/auth/useRegister";

export const login = async (
  vars: LoginRequestTypes
): Promise<ResponseTypes> => {
  const response = await api({
    method: "post",
    url: `/auth/login`,
    payload: vars,
  });
  return response;
};

export const register = async (vars: RegisterValues) => {
  const response = await api({
    method: "post",
    url: `/userSignup/`,
    payload: vars,
  });
  return response;
};

export const forgetPassword = async (vars: any) => {
  const response = await api({
    method: "post",
    url: "/auth/reset-password",
    payload: vars,
  });
  return response;
};

export const resetPassword = async (vars: any) => {
  const response = await api({
    method: "post",
    url: `/auth/forgot-password`,
    payload: { email: vars },
  });
  return response;
};

export const logout = async (vars: RegisterValues) => {
  const response = await api({
    method: "post",
    url: `/userLogout/`,
    payload: vars,
  });
  return response;
};

export const getUsers = async (): Promise<any> => {
  const response = await api({
    method: "get",
    url: `/auth/users`,
  });
  return response;
};

export const getUserDetailsById = async (id: string): Promise<any> => {
  const response = await api({
    method: "get",
    url: `/auth/users/${id}`,
  });
  return response;
};
