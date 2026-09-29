import { useEffect, useState } from "react";
import {
  editProductService,
  getProductService,
} from "../../services/productService";
import ProductForm from "../../components/Form/ProductForm";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();
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

  const handleEditProduct = async (inputs) => {
    try {
      const res = await editProductService(inputs, user?.token);
      if (res.response === "success") {
        alert("Chỉnh sửa sản phẩm thành công !");
      } else if (res?.errors) {
        console.log(res?.errors);
      }
    } catch (error) {
      console.error(
        "Lỗi chỉnh sửa sản phẩm. Không thể kết nối đến máy chủ. Vui lòng thử lại sau!",
        error,
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id || !user?.token) {
        alert("Bạn chưa đăng nhập hoặc chưa có sản phẩm để chỉnh sửa ");
        return;
      }
      try {
        const res = await getProductService(id, user.token);
        console.log("res edit: ", res.data);
        if (res.response === "success") {
          const productData = {
            ...res.data,
            category: String(res.data.id_category),
            brand: String(res.data.id_brand),
            company: res.data.company_profile,
            status: String(res.data.status),
          };
          console.log("productData: ", productData);
          setProduct(productData);
        } else {
          console.log(res?.error);
        }
      } catch (error) {
        console.error(
          "Lỗi lấy dữ liệu sản phẩm. Không thể kết nối đến máy chủ. Vui lòng thử lại sau!",
          error,
        );
      }
    };
    fetchData();
  }, [id, user?.token]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Edit Product</h2>

        <ProductForm
          onSubmit={handleEditProduct}
          buttonText="Edit"
          initialData={product}
        />
      </div>
    </div>
  );
}
