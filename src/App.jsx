import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import Login from "./pages/Member/Login";

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
        <Route path="member/login-register" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
