import { api } from "@/api/base";

export const getAllAccount = async () => {
  const response = await api({
    method: "get",
    url: "/read_all_accounts",
    apiType: "xero",
  });
  return response;
};

export const singleUserAccount = async (vars: any) => {
  const response = await api({
    method: "get",
    url: `/accounting_account_read_one/${vars}`,
    apiType: "xero",
  });
  return response;
};

export const createUserAccount = async (vars: any) => {
  const response = await api({
    method: "post",
    url: `/create_accounts`,
    payload: vars,
    apiType: "xero",
  });
  return response;
};

export const singleUserAccountDelete = async (vars: any) => {
  const response = await api({
    method: "delete",
    url: `/accounting_account_delete/${vars}`,
    apiType: "xero",
  });
  return response;
};

export const updateUserAccount = async (vars: any) => {
  const response = await api({
    method: "put",
    url: `/accounting_account_update/${vars.AccountID}`,
    payload: {
      name: vars.name,
      code: vars.code,
      type: vars.type,
      tier: vars.tier,
    },
    apiType: "xero",
  });
  return response;
};
