import { useState } from "react";
import { updateService } from "../../services/authService";

export default function Account() {
  const [avatarPreview, setAvatarPreview] = useState("");
  const [err, setErr] = useState({});
  const [token, setToken] = useState("");
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setToken(parsedData?.token);
        return parsedData?.Auth;
      } catch (error) {
        console.error("Lỗi parse JSON từ localStorage:", error);
        return null;
      }
    }
    return null;
  });

  const getAvatarSrc = () => {
    if (avatarPreview) {
      return avatarPreview;
    }
    if (user?.avatar) {
      return `http://127.0.0.1:8000/upload/user/avatar/${user.avatar}`;
    }
    return;
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const type = e.target.type;

    if (type === "file") {
      const fileList = e.target.files;

      if (fileList && fileList.length > 0) {
        const file = fileList[0];

        const reader = new FileReader();
        reader.onload = (event) => {
          const base64String = event.target.result;

          setAvatarPreview(base64String);

          setUser((state) => ({
            ...state,
            [name]: base64String,
            avatarFile: file,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      const value = e.target.value;
      setUser((state) => ({ ...state, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validTypes = ["image/png", "image/jpg", "image/jpeg"];
    const errs = {};
    let check = true;
    if (!user.name) {
      errs.nameErr = "Vui lòng nhập name";
      check = false;
    }
    if (!user.email) {
      errs.emailErr = "Vui lòng nhập Email";
      check = false;
    }
    if (!user.phone) {
      errs.phoneErr = "Vui lòng nhập phone";
      check = false;
    }
    if (!user.address) {
      errs.addressErr = "Vui lòng nhập address";
      check = false;
    }
    if (!user.avatar) {
      if (!user.avatarFile || !user.avatarFile.name) {
        errs.avatarErr = "Vui lòng chọn ảnh đại diện";
        check = false;
      } else {
        if (!validTypes.includes(user.avatarFile.type)) {
          errs.avatarErr = "File ảnh không hợp lệ";
          check = false;
        }
        if (user.avatarFile.size > 1024 * 1024) {
          errs.avatarErr = "Size ảnh không hợp lệ";
          check = false;
        }
      }
    }
    if (!check) {
      setErr(errs);
    } else {
      setErr({});
      try {
        // eslint-disable-next-line no-unused-vars
        const { avatarFile, ...payload } = user;
        let dataToSend = {
          ...payload,
        };
        if (!dataToSend.password) {
          dataToSend.password = "";
        }
        const res = await updateService(dataToSend, token);
        if (res?.response === "success") {
          const updatedUser = res.Auth;
          const updatedToken = res.token;
          const updatedData = {
            Auth: updatedUser,
            token: updatedToken,
          };
          localStorage.setItem("user", JSON.stringify(updatedData));
          setUser(updatedUser);
          setToken(updatedToken);
          alert("Cập nhật tài khoản thành công!");
        } else {
          alert("Cập nhật thất bại. Vui lòng kiểm tra lại thông tin!");
        }
      } catch (error) {
        console.log("Lỗi cập nhật tài khoản", error);
        alert("Có lỗi xảy ra khi kết nối đến máy chủ!");
      }
    }
  };

  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Update user</h2>
          <div className="signup-form">
            <h2>User Update</h2>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleInput}
                placeholder="Name"
                value={user?.name || ""}
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
                type="email"
                name="email"
                onChange={handleInput}
                placeholder="Email Address"
                value={user?.email || ""}
                readOnly
              />
              {err.emailErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.emailErr}
                </p>
              )}
              <input
                type="password"
                onChange={handleInput}
                name="password"
                placeholder="Password"
              />
              <input
                type="text"
                name="phone"
                onChange={handleInput}
                placeholder="Phone"
                value={user?.phone || ""}
              />
              {err.phoneErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.phoneErr}
                </p>
              )}
              <input
                type="text"
                name="address"
                onChange={handleInput}
                placeholder="Address"
                value={user?.address || ""}
              />
              {err.addressErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.addressErr}
                </p>
              )}
              <input
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleInput}
              />
              <div style={{ margin: "10px 0" }}>
                <img
                  src={getAvatarSrc()}
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
              {err.avatarErr && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err.avatarErr}
                </p>
              )}
              <button type="submit" className="btn btn-default">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
