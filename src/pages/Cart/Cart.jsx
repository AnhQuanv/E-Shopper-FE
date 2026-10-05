import { useEffect, useState } from "react";
import { postCartService } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../utils/cart";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuality,
  increaseQuality,
  removeFromCart,
} from "../../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const [products, setProducts] = useState([]);
  const totalPrice = products.reduce(
    (total, product) => total + Number(product.price) * Number(product.qty),
    0,
  );
  // const handleIncreaseQuantity = (id) => {
  //   setProducts((prev) =>
  //     prev.map((product) =>
  //       product.id === id
  //         ? { ...product, qty: Number(product.qty + 1) }
  //         : product,
  //     ),
  //   );
  //   const cart = JSON.parse(localStorage.getItem("cart")) || {};

  //   cart[id] = (cart[id] || 0) + 1;

  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  // const handleDecreaseQuantity = (id) => {
  //   setProducts((prev) =>
  //     prev.map((product) =>
  //       product.id === id
  //         ? { ...product, qty: Math.max(1, Number(product.qty) - 1) }
  //         : product,
  //     ),
  //   );
  //   const cart = JSON.parse(localStorage.getItem("cart")) || {};

  //   if (cart[id] > 1) {
  //     cart[id] -= 1;
  //   }

  //   localStorage.setItem("cart", JSON.stringify(cart));
  // };

  // const handleDeleteProduct = (id) => {
  //   const confirmDelete = window.confirm(
  //     "Bạn có chắc muốn xoá sản phẩm này không ?",
  //   );
  //   if (!confirmDelete) return;
  //   setProducts((prev) => prev.filter((product) => product.id !== id));
  //   localStorage.setItem("cart", JSON.stringify(products));
  // };

  useEffect(() => {
    const fetchListCart = async () => {
      // const data = JSON.parse(localStorage.getItem("cart"));
      if (!cart || Object.keys(cart).length === 0) {
        alert("không có sản phẩm nào!");
        navigate("/");
        return;
      }
      try {
        const res = await postCartService(cart);
        console.log("res cart: ", res);
        if (res.response === "success") {
          setProducts(res.data);
        } else {
          console.log("Lấy giỏ hàng thất bại: ", res.message || res);
        }
      } catch (error) {
        console.log("Lỗi hệ thống khi gọi postCartService:", error);
      }
    };
    fetchListCart();
  }, [cart, navigate]);

  return (
    <div>
      <section id="cart_items">
        <div className="container">
          <div className="breadcrumbs">
            <ol className="breadcrumb">
              <li>
                <a href="#">Home</a>
              </li>
              <li className="active">Shopping Cart</li>
            </ol>
          </div>
          {products.length > 0 ? (
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr>
                      <td className="cart_product">
                        <a href>
                          <img
                            src={`http://127.0.0.1:8000/upload/product/${product.id_user}/${getImage(product.image)}`}
                            alt=""
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "contain",
                            }}
                          />
                        </a>
                      </td>
                      <td className="cart_description">
                        <h4>
                          <a href>{product.name}</a>
                        </h4>
                        <p>Web ID: {product.web_id}</p>
                      </td>
                      <td className="cart_price">
                        <p>${product.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <a
                            className="cart_quantity_up"
                            onClick={() =>
                              dispatch(increaseQuality(product.id))
                            }
                          >
                            +
                          </a>
                          <input
                            className="cart_quantity_input"
                            type="text"
                            name="quantity"
                            value={product.qty}
                            autoComplete="off"
                            size={2}
                          />
                          <a
                            className="cart_quantity_down"
                            onClick={() =>
                              dispatch(decreaseQuality(product.id))
                            }
                          >
                            -
                          </a>
                        </div>
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">
                          ${Number(product.price) * Number(product.qty)}
                        </p>
                      </td>
                      <td className="cart_delete">
                        <a
                          className="cart_quantity_delete"
                          onClick={() => dispatch(removeFromCart(product.id))}
                        >
                          <i className="fa fa-times" />
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4}>Total</td>
                    <td colSpan={4}>${totalPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <p>Bạn chưa thêm gì vào giỏ hàng </p>
            </div>
          )}
        </div>
      </section>
      {/*/#cart_items*/}
      <section id="do_action">
        <div className="container">
          <div className="heading">
            <h3>What would you like to do next?</h3>
            <p>
              Choose if you have a discount code or reward points you want to
              use or would like to estimate your delivery cost.
            </p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="chose_area">
                <ul className="user_option">
                  <li>
                    <input type="checkbox" />
                    <label>Use Coupon Code</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Use Gift Voucher</label>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <label>Estimate Shipping &amp; Taxes</label>
                  </li>
                </ul>
                <ul className="user_info">
                  <li className="single_field">
                    <label>Country:</label>
                    <select>
                      <option>United States</option>
                      <option>Bangladesh</option>
                      <option>UK</option>
                      <option>India</option>
                      <option>Pakistan</option>
                      <option>Ucrane</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field">
                    <label>Region / State:</label>
                    <select>
                      <option>Select</option>
                      <option>Dhaka</option>
                      <option>London</option>
                      <option>Dillih</option>
                      <option>Lahore</option>
                      <option>Alaska</option>
                      <option>Canada</option>
                      <option>Dubai</option>
                    </select>
                  </li>
                  <li className="single_field zip-field">
                    <label>Zip Code:</label>
                    <input type="text" />
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Get Quotes
                </a>
                <a className="btn btn-default check_out" href>
                  Continue
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="total_area">
                <ul>
                  <li>
                    Cart Sub Total <span>$59</span>
                  </li>
                  <li>
                    Eco Tax <span>$2</span>
                  </li>
                  <li>
                    Shipping Cost <span>Free</span>
                  </li>
                  <li>
                    Total <span>$61</span>
                  </li>
                </ul>
                <a className="btn btn-default update" href>
                  Update
                </a>
                <a className="btn btn-default check_out" href>
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/#do_action*/}
    </div>
  );
}
