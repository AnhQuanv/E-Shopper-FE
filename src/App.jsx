import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import Login from "./pages/Member/Login";
import Account from "./pages/Member/Account";
import AddProduct from "./pages/Product/AddProduct";
import ListProduct from "./pages/Product/ListProduct";
import EditProduct from "./pages/Product/EditProduct";
import DetailProduct from "./pages/Product/DetailProduct";
import Cart from "./pages/Cart/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/blog">
          <Route index element={<Blog />} />
          <Route path="detail/:id" element={<BlogDetail />} />
          <Route path="list" element={<Blog />} />
        </Route>
        <Route path="member/login-register" element={<Login />} />
        <Route path="member/account">
          <Route index element={<Account />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/list" element={<ListProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="product-details/:id" element={<DetailProduct />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
