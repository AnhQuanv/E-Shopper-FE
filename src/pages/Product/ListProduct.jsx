import { useEffect, useState } from "react";
import {
  deleteProductService,
  listProductService,
} from "../../services/productService";
import { Link, useNavigate } from "react-router-dom";
import { getImage } from "../../utils/cart";

export default function ListProduct() {
  const navigate = useNavigate();
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

  const [listProduct, setListProduct] = useState([]);

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa sản phẩm này không?",
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteProductService(id, user?.token);

      if (res.response === "success") {
        alert("Xóa sản phẩm thành công!");

        setListProduct((prev) => prev.filter((product) => product.id !== id));
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.token) {
          alert("Bạn chưa đăng nhập hoặc token không tồn tại!");
          return;
        }
        const res = await listProductService(user.token);
        if (res.response === "success") {
          const productList = Array.isArray(res.data)
            ? res.data
            : Object.values(res.data);
          setListProduct(productList);
        } else {
          console.log("Lấy danh sách sản phẩm thất bại:", res.message || res);
        }
      } catch (error) {
        console.log("Lỗi hệ thống khi gọi listProduct:", error);
      }
    };
    fetchData();
  }, [user?.token]);
  return (
    <>
      {listProduct && listProduct.length > 0 ? (
        <div className="col-sm-9">
          <div className="table-responsive cart_info">
            <table
              className="table table-condensed"
              style={{ marginBottom: "40px" }}
            >
              <thead>
                <tr className="cart_menu">
                  <th className="image" style={{ textAlign: "center" }}>
                    image
                  </th>
                  <th className="description" style={{ textAlign: "center" }}>
                    name
                  </th>
                  <th className="price" style={{ textAlign: "center" }}>
                    price
                  </th>
                  <th className="total" style={{ textAlign: "center" }}>
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((product) => (
                  <tr key={product.id}>
                    <td
                      className="cart_product"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <a>
                        <img
                          src={`http://127.0.0.1:8000/upload/product/${user?.Auth?.id}/${getImage(product.image)}`}
                          alt=""
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "contain",
                          }}
                        />
                      </a>
                    </td>

                    <td
                      className="cart_description"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <h4 style={{ margin: 0 }}>
                        <a href="#">{product.name}</a>
                      </h4>
                    </td>

                    <td
                      className="cart_price"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <p style={{ margin: 0 }}>${product.price}</p>
                    </td>

                    <td
                      className="cart_total"
                      style={{
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/member/account/product/edit/${product.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        style={{
                          background: "red",
                          color: "white",
                          marginLeft: "12px",
                        }}
                        className="btn btn-primary"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "60px",
                marginBottom: "20px",
              }}
            >
              <Link
                to="/member/account/product/add"
                className="btn btn-primary"
              >
                Add New
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-sm-9">
          <p>Chưa có dữ liệu sản phẩm vui lòng hãy thêm vào</p>
          <Link to="/member/account/product/add" className="btn btn-primary">
            Add New
          </Link>
        </div>
      )}
    </>
  );
}
