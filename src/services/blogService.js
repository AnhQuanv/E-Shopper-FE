import axiosClient from "../api/axiosClient";

export const getBlogList = async () => {
  const res = await axiosClient.get("blog");
  return res.data.blog.data;
};

export const getBlogDetail = async (id) => {
  const res = await axiosClient.get(`blog/detail/${id}`);
  return res.data;
};

export const postCommentService = async (data, token) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  const res = await axiosClient.post(`blog/comment/${data.id}`, formData, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
  console.log("res ser: ", res);
  return res.data;
};
