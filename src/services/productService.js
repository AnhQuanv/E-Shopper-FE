import axiosClient from "../api/axiosClient";

export const categoryBrandService = async () => {
  const res = await axiosClient.get("category-brand");
  console.log("res service", res);
  return res.data;
};

export const addProductService = async (data, token) => {
  console.log("data: ", data);
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    }
  });

  const res = await axiosClient.post("user/product/add", formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return res.data;
};
