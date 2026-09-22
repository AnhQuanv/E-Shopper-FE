import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
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

  const renderLogin = () => {
    const data = localStorage.getItem("user");

    return (
      <>
        {data ? (
          <li>
            <a href="#" onClick={handleLogout}>
              <i className="fa fa-lock"></i> Logout
            </a>
          </li>
        ) : (
          <li>
            <Link to="/member/login-register">
              <i className="fa fa-lock"></i> Login
            </Link>
          </li>
        )}
      </>
    );
  };

  const renderAccount = () => {
    const data = localStorage.getItem("user");

    return (
      <>
        {data && (
          <li>
            <a href="">
              <i className="fa fa-user"></i> Account
            </a>
          </li>
        )}
      </>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/member/login-register");
  };

  return (
    <>
      <header id="header">
        <div className="header_top">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contactinfo">
                  <ul className="nav nav-pills">
                    <li>
                      <a href="#">
                        <i className="fa fa-phone"></i> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-envelope"></i> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="social-icons pull-right">
                  <ul className="nav navbar-nav">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row">
              <div className="col-md-4 clearfix">
                <div className="logo pull-left">
                  <a href="index.html">
                    <img src="images/home/logo.png" alt="" />
                  </a>
                </div>
                <div className="btn-group pull-right clearfix">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canada</a>
                      </li>
                      <li>
                        <a href="">UK</a>
                      </li>
                    </ul>
                  </div>

                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-8 clearfix">
                <div className="shop-menu clearfix pull-right">
                  <ul className="nav navbar-nav">
                    {renderAccount()}

                    <li>
                      <a href="">
                        <i className="fa fa-star"></i> Wishlist
                      </a>
                    </li>
                    <li>
                      <a href="checkout.html">
                        <i className="fa fa-crosshairs"></i> Checkout
                      </a>
                    </li>
                    <li id="cart-quality" style={{ display: "flex" }}>
                      <a href="cart.html">
                        <i className="fa fa-shopping-cart"></i>
                        Cart
                      </a>
                      <span
                        style={{
                          position: "absolute",
                          border: "1px solid red",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                          display: "none",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          backgroundColor: "red",
                          top: "7px",
                          left: "10px",
                          fontSize: "8px",
                        }}
                      >
                        3
                      </span>
                    </li>
                    {renderLogin()}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>
                <div className="mainmenu pull-left">
                  <ul className="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <Link to="/" className="active">
                        Home
                      </Link>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Shop<i className="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <Link to="/shop">Products</Link>
                        </li>
                        <li>
                          <Link to="/product-details">Product Details</Link>
                        </li>
                        <li>
                          <Link to="/bai1">Bai1</Link>
                        </li>
                        <li>
                          <a id="cart" href="cart.html">
                            Cart
                          </a>
                        </li>
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        Blog<i className="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" className="sub-menu">
                        <li>
                          <a href="blog.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-single.html">Blog Single</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
