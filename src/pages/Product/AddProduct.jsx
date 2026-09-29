import { useState } from "react";
import { addProductService } from "../../services/productService";
import ProductForm from "../../components/Form/ProductForm";

export default function AddProduct() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Lỗi parse JSON từ localStorage:", error);
        return null;
      }
    }
    return null;
  });

  const handleAddProduct = async (inputs) => {
    try {
      const res = await addProductService(inputs, user?.token);
      if (res.response === "success") {
        alert("Thêm sản phẩm thành công !");
      } else if (res?.errors) {
        console.log(res?.errors);
      }
    } catch (error) {
      console.error(
        "Lỗi thêm sản phẩm. Không thể kết nối đến máy chủ. Vui lòng thử lại sau!",
        error,
      );
    }
  };

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Create Product</h2>

        <ProductForm onSubmit={handleAddProduct} buttonText="Add" />
      </div>
    </div>
  );
}
