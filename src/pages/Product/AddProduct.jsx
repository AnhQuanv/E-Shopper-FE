import { useEffect, useState } from "react";
import {
  addProductService,
  categoryBrandService,
} from "../../services/productService";

export default function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [inputs, setInputs] = useState({
    status: "1",
  });
  const [err, setErr] = useState({});
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
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const type = e.target.type;
    if (type === "file") {
      const fileList = Array.from(e.target.files);
      if (fileList.length > 3) {
        alert("Bạn chỉ được chọn tối đa 3 hình ảnh!");
        e.target.value = "";
        setInputs((state) => ({ ...state, ["file[]"]: [] }));
        return;
      }
      console.log("fileList: ", fileList);
      setInputs((state) => ({ ...state, ["file[]"]: fileList }));
    } else {
      setInputs((state) => ({ ...state, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    const uploadedFiles = inputs["file[]"] || inputs.file || [];
    const errs = {};
    let check = true;
    if (!user?.token) {
      alert("Bạn chưa đăng nhập hoặc token không tồn tại!");
      return;
    }
    if (!inputs.name) {
      errs.nameErr = "Vui lòng nhập tên sản phẩm";
      check = false;
    }
    if (!inputs.price) {
      errs.priceErr = "Vui lòng nhập giá";
      check = false;
    }
    if (!inputs.category) {
      errs.categoryErr = "Vui lòng chọn danh mục";
      check = false;
    }
    if (!inputs.brand) {
      errs.brandErr = "Vui lòng chọn nhãn hàng";
      check = false;
    }
    if (!inputs.company) {
      errs.companyErr = "Vui lòng nhập công ty";
      check = false;
    }
    if (inputs.status === "0" && !inputs.sale) {
      errs.saleErr = "Vui lòng nhập giá giảm";
      check = false;
    }
    if (!inputs.detail) {
      errs.detailErr = "Vui lòng nhập mô tả sản phẩm";
      check = false;
    }
    if (uploadedFiles.length === 0) {
      errs.fileErr = "Vui lòng chọn ít nhất 1 hình ảnh";
      check = false;
    } else if (uploadedFiles.length > 3) {
      errs.fileErr = "Chỉ được tải lên tối đa 3 hình ảnh";
      check = false;
    } else {
      for (let file of uploadedFiles) {
        if (!validTypes.includes(file.type)) {
          errs.fileErr = `File "${file.name}" không đúng định dạng hình ảnh`;
          check = false;
          break;
        }
        if (file.size > 1024 * 1024) {
          errs.fileErr = `File "${file.name}" vượt quá dung lượng 1MB`;
          check = false;
          break;
        }
      }
    }
    if (!check) {
      setErr(errs);
    } else {
      setErr({});
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryBrandService();
        console.log("res add: ", res.category);
        if (res.message === "success") {
          setCategories(res.category);
          setBrands(res.brand);
        } else {
          console.log(
            "Lấy danh mục & thương hiệu thất bại:",
            res.message || res,
          );
        }
      } catch (error) {
        console.log("Lỗi hệ thống khi gọi categoryBrandService:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Create Product</h2>
          <div className="signup-form">
            <h2>Create New Product</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                onChange={handleInput}
                name="name"
                type="text"
                value={inputs.name || ""}
                placeholder="Name"
              />
              {err.nameErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.nameErr}
                </p>
              )}
              <input
                onChange={handleInput}
                name="price"
                type="text"
                value={inputs.price || ""}
                placeholder="Price"
              />
              {err.priceErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.priceErr}
                </p>
              )}
              <select
                onChange={handleInput}
                name="category"
                value={inputs.category || ""}
              >
                <option value="">Please choose category</option>
                {categories &&
                  categories.map((value) => (
                    <option key={value.id} value={value.id}>
                      {value.category}
                    </option>
                  ))}
              </select>
              {err.categoryErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.categoryErr}
                </p>
              )}
              <select
                onChange={handleInput}
                name="brand"
                value={inputs.brand || ""}
              >
                <option value="">Please choose brand</option>
                {brands &&
                  brands.map((value) => (
                    <option key={value.id} value={value.id}>
                      {value.brand}
                    </option>
                  ))}
              </select>
              {err.brandErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.brandErr}
                </p>
              )}
              <select
                name="status"
                value={inputs.status || "1"}
                onChange={handleInput}
              >
                <option value="0">Sale</option>
                <option value="1">New</option>
              </select>
              {inputs.status === "0" && (
                <>
                  <input
                    type="text"
                    name="sale"
                    placeholder="0"
                    value={inputs.sale || ""}
                    onChange={handleInput}
                  />
                  {err?.saleErr && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        paddingLeft: "96px",
                      }}
                    >
                      {err.saleErr}
                    </p>
                  )}
                </>
              )}
              <input
                onChange={handleInput}
                name="company"
                placeholder="Company Profile"
                value={inputs.company || ""}
              />
              {err?.companyErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.companyErr}
                </p>
              )}
              <input
                onChange={handleInput}
                name="file"
                type="file"
                accept="image/*"
                multiple
              />
              {err?.fileErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.fileErr}
                </p>
              )}
              <textarea
                onChange={handleInput}
                name="detail"
                placeholder="Detail"
                value={inputs.detail || ""}
              ></textarea>
              {err?.detailErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.detailErr}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "15px 0",
                }}
              >
                <button type="submit" className="btn btn-default">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
