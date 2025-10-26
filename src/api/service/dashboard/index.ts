import { api } from "@/api/base";

export const CheckoutSession = async (vars: any) => {
  const response = await api({
    method: "post",
    url: `/create-checkout-session`,
    payload: vars,
  });
  return response;
};

export const CheckDiscordUser = async (vars: any) => {
  const response = await api({
    method: "post",
    url: `/CheckDiscordUser/`,
    payload: vars,
  });
  return response;
};

export const createProduct = async (vars: any) => {
  const response = await api({
    method: "post",
    url: `/products/`,
    payload: vars,
  });
  return response;
};

export const updateProduct = async (id: string, vars: any) => {
  const response = await api({
    method: "put",
    url: `/products/${id}`,
    payload: vars,
  });
  return response;
};

export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await api({
    method: "get",
    url: `/products?${queryParams}`,
  });
  return response;
};

export const getProductById = async (id: string) => {
  const response = await api({
    method: "get",
    url: `/products/${id}`,
  });
  return response;
};

export const deleteProduct = async (id: string) => {
  const response = await api({
    method: "delete",
    url: `/products/${id}`,
  });
  return response;
};

export const getFAQs = async () => {
  const response = await api({
    method: "get",
    url: `/faq`,
  });
  return response.data;
};

export const getFAQById = async (id: string) => {
  const response = await api({
    method: "get",
    url: `/faq/${id}`,
  });
  return response.data.data;
};

export const createFAQ = async (data: any) => {
  const response = await api({
    method: "post",
    url: `/faq`,
    payload: data,
  });
  return response.data.data;
};

export const updateFAQ = async (id: string, data: any) => {
  const response = await api({
    method: "put",
    url: `/faq/${id}`,
    payload: data,
  });
  return response.data.data;
};

export const updateFAQStatus = async (id: string, isActive: boolean) => {
  const response = await api({
    method: "patch",
    url: `/faq/${id}/status`,
    payload: { isActive },
  });
  return response.data.data;
};

export const deleteFAQ = async (id: string): Promise<void> => {
  await api({
    method: "delete",
    url: `/faq/${id}`,
  });
};

export const getOrderById = async (orderId: string) => {
  return await api({
    method: "get",
    url: `/orders/${orderId}`,
  });
};

// Get all orders (for admin)
export const getAllOrders = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/orders?${queryParams}`,
  });
};

export const getAllPayments = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/orders/payments?${queryParams}`,
  });
};

// Get user orders
export const getUserOrders = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/orders/user/orders?${queryParams}`,
  });
};

// Update order status
export const updateOrderStatus = async (orderId: string, statusData: any) => {
  return await api({
    method: "patch",
    url: `/orders/${orderId}/status`,
    payload: statusData,
  });
};

// Update payment status
export const updatePaymentStatus = async (
  orderId: string,
  paymentData: any
) => {
  return await api({
    method: "patch",
    url: `/orders/${orderId}/payment-status`,
    payload: paymentData,
  });
};

// Cancel order
export const cancelOrder = async (orderId: string) => {
  return await api({
    method: "post",
    url: `/orders/${orderId}/cancel`,
  });
};

export const getAllContactUs = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/contact-us${queryParams}`,
  });
};

export const deleteContactUs = async (id: string) => {
  return await api({
    method: "delete",
    url: `/contact-us/${id}`,
  });
};

export const getAllFeedbacks = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api({
    method: "get",
    url: `/feedback?${queryParams}`,
  });
};
