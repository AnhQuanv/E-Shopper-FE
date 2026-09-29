import { useEffect, useState } from "react";
import { categoryBrandService } from "../../services/productService";

export default function ProductForm({
  initialData = {},
  onSubmit,
  buttonText = "Save",
}) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [inputs, setInputs] = useState({
    status: "1",
    ...initialData,
  });
  const [listImage, setListImage] = useState(initialData.image || []);
  const [selectedImages, setSelectedImages] = useState([]);

  const [err, setErr] = useState({});

  const getImageSrc = (image) => {
    if (image.startsWith("data:image")) {
      return image;
    }

    return `http://127.0.0.1:8000/upload/product/${initialData.id_user}/${image}`;
  };

  const validate = () => {
    const errs = {};
    let check = true;
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
      errs.saleErr = "Vui lòng nhập phần trăm giảm";
      check = false;
    }

    if (!inputs.detail) {
      errs.detailErr = "Vui lòng nhập mô tả sản phẩm";
      check = false;
    }
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    const uploadedFiles = inputs["file[]"] || inputs.file || [];
    if (buttonText === "Add" && uploadedFiles.length === 0) {
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
    return {
      isValid: check,
      errors: errs,
    };
  };

  const handleInput = (e) => {
    const { name, type, value } = e.target;

    if (type === "file") {
      const fileList = Array.from(e.target.files);

      fileList.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          const base64string = event.target.result;

          setListImage((prev) => {
            const newList = [...prev, base64string];

            return newList;
          });
        };

        reader.readAsDataURL(file);
      });

      setInputs((prev) => ({
        ...prev,
        ["file[]"]: fileList,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = validate();
    if (!result.isValid) {
      setErr(result.errors);
      return;
    }
    setErr({});

    if (buttonText === "Add") {
      await onSubmit(inputs);
    } else {
      const dataSubmit = {
        ...inputs,
        avatarCheckBox: selectedImages,
      };
      await onSubmit(dataSubmit);
    }
  };

  const handleSelectImage = (e, image) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedImages((prev) => [...prev, image]);
    } else {
      setSelectedImages((prev) => prev.filter((item) => item !== image));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryBrandService();
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
          <div className="signup-form">
            <h2>{buttonText} Product</h2>

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

              {listImage.length > 0 && (
                <div
                  style={{
                    margin: "10px 0 10px 96px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  {listImage.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <img
                        src={getImageSrc(image)}
                        alt="Image Preview"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          border: "1px solid #ccc",
                        }}
                      />

                      {buttonText === "Edit" &&
                        !image.startsWith("data:image") && (
                          <input
                            checked={selectedImages.includes(image)}
                            onChange={(e) => handleSelectImage(e, image)}
                            type="checkbox"
                          />
                        )}
                    </div>
                  ))}
                </div>
              )}

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
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
