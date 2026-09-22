import { useState } from "react";
import { registerService } from "../../services/authService";

export default function RegisterForm() {
  const [inputs, setInputs] = useState({});
  const [err, setErr] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleInput = (e) => {
    const name = e.target.name;
    const type = e.target.type;

    // 1. Nếu là ô chọn File
    if (type === "file") {
      const fileList = e.target.files;

      // Kiểm tra xem người dùng có chọn file thực sự không (tránh trường hợp bấm Cancel)
      if (fileList && fileList.length > 0) {
        const file = fileList[0];

        // Cập nhật file vào state inputs
        setInputs((state) => ({ ...state, [name]: file }));

        // Đọc file để tạo đường dẫn xem trước (Preview)
        const reader = new FileReader();
        reader.onload = (event) => {
          setAvatarPreview(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      const value = e.target.value;
      setInputs((state) => ({ ...state, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    const errs = {};
    let check = true;
    if (!inputs.name) {
      errs.nameErr = "Vui lòng nhập name";
      check = false;
    }
    if (!inputs.email) {
      errs.emailErr = "Vui lòng nhập Email";
      check = false;
    }
    if (!inputs.password) {
      errs.passwordErr = "Vui lòng nhập password";
      check = false;
    }
    if (!inputs.password_confirm) {
      errs.password_confirmErr = "Vui lòng nhập password_confirm";
      check = false;
    }
    if (inputs.password !== inputs.password_confirm) {
      errs.passwordErr = "Mật khẩu không trùng nhau";
      errs.password_confirmErr = "Mật khẩu không trùng nhau";
      check = false;
    }
    if (!inputs.phone) {
      errs.phoneErr = "Vui lòng nhập phone";
      check = false;
    }
    if (!inputs.address) {
      errs.addressErr = "Vui lòng nhập address";
      check = false;
    }
    if (!inputs.avatar || !inputs.avatar.name) {
      errs.avatarErr = "Vui lòng chọn ảnh đại diện";
      check = false;
    } else {
      if (!validTypes.includes(inputs.avatar.type)) {
        errs.avatarErr = "File ảnh không hợp lệ";
        check = false;
      }
      if (inputs.avatar.size > 1024 * 1024) {
        errs.avatarErr = "Size ảnh không hợp lệ";
        check = false;
      }
    }
    if (!check) {
      setErr(errs);
    } else {
      setErr({});
      try {
        const { password_confirm, ...payload } = inputs;
        const dataToSend = {
          ...payload,
          level: 0,
        };
        const res = await registerService(dataToSend);
        if (res?.message === "success") {
          alert("Đăng ký thành công!");
          setInputs({});
          setAvatarPreview("");
          setErr({});
          e.target.reset();
        } else {
          if (res?.errors?.email) {
            errs.emailErr = res.errors.email;
            setErr(errs);
          }
        }
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        errs.avatarErr = "Không thể kết nối đến máy chủ. Vui lòng thử lại sau!";
        setErr(errs);
      }
    }
  };

  return (
    <div className="col-sm-4">
      <div className="signup-form">
        <h2>New User Signup!</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            name="name"
            type="text"
            placeholder="Name"
            value={inputs.name || ""}
          />
          {err.nameErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.nameErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email Address"
            value={inputs.email || ""}
          />
          {err.emailErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.emailErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Password"
            value={inputs.password || ""}
          />
          {err.passwordErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.passwordErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="password_confirm"
            type="password"
            placeholder="Confirm Password"
            value={inputs.password_confirm || ""}
          />
          {err.password_confirmErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.password_confirmErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="phone"
            placeholder="Phone"
            value={inputs.phone || ""}
          />
          {err.phoneErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.phoneErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="address"
            placeholder="Address"
            value={inputs.address || ""}
          />
          {err.addressErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.addressErr}
            </p>
          )}
          <input
            onChange={handleInput}
            name="avatar"
            type="file"
            accept="image/*"
          />

          {avatarPreview && (
            <div style={{ margin: "10px 0 10px 96px" }}>
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          )}

          {err.avatarErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.avatarErr}
            </p>
          )}
          <button type="submit" className="btn btn-default">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
