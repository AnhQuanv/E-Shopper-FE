import { useState } from "react";
import { loginService } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [inputs, setInputs] = useState({});
  const [err, setErr] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    let check = true;
    if (!inputs.email) {
      errs.emailErr = "Vui lòng nhập Email";
      check = false;
    }
    if (!inputs.password) {
      errs.passwordErr = "Vui lòng nhập password";
      check = false;
    }
    if (!check) {
      setErr(errs);
    } else {
      try {
        const dataToSend = { ...inputs, level: 0 };
        setInputs(dataToSend);

        const res = await loginService(dataToSend);

        if (res?.success === "success") {
          const user = {
            token: res.token,
            Auth: res.Auth,
          };
          localStorage.setItem("user", JSON.stringify(user));

          navigate("/");
        } else {
          errs.passwordErr =
            res?.errors?.errors || "Đăng nhập thất bại. Vui lòng kiểm tra lại!";
          setErr(errs);
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        errs.passwordErr =
          "Không thể kết nối đến máy chủ. Vui lòng thử lại sau!";
        setErr(errs);
      }
    }
  };

  return (
    <div className="col-sm-4 col-sm-offset-1">
      <div className="login-form">
        <h2>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email Address"
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
          />
          {err.passwordErr && (
            <p style={{ color: "red", fontSize: "14px", paddingLeft: "96px" }}>
              {err.passwordErr}
            </p>
          )}
          <span>
            <input type="checkbox" className="checkbox" />
            Keep me signed in
          </span>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
