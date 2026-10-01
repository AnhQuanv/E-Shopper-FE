import axiosClient from "../api/axiosClient";

export const categoryBrandService = async () => {
  const res = await axiosClient.get("category-brand");
  return res.data;
};

export const addProductService = async (data, token) => {
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

export const listProductService = async (token) => {
  const res = await axiosClient.get("user/my-product", {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  return res.data;
};

export const getProductService = async (id, token) => {
  const res = await axiosClient.get(`user/product/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
  });
  console.log("res: ", res);
  return res.data;
};

export const editProductService = async (data, token) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("brand", data.brand);
  formData.append("company", data.company);
  formData.append("detail", data.detail);
  formData.append("status", data.status);

  data["file[]"]?.forEach((file) => {
    formData.append("file[]", file);
  });

  data.avatarCheckBox?.forEach((image) => {
    formData.append("avatarCheckBox[]", image);
  });

  const res = await axiosClient.post(
    `user/product/update/${data.id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  return res.data;
};

export const deleteProductService = async (id, token) => {
  const res = await axiosClient.get(`user/product/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return res.data;
};

export const listHomeService = async () => {
  const res = await axiosClient.get("product");
  return res.data;
};

export const productDetailService = async (id) => {
  const res = await axiosClient.get(`product/detail/${id}`);
  console.log("res ser: ", res);
  return res.data
};
