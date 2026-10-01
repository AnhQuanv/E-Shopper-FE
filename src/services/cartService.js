import axiosClient from "../api/axiosClient";

export const postCartService = async (data) => {
  const res = await axiosClient.post("product/cart", data);
  return res.data;
};
