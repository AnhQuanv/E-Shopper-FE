import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LeftSideBarBlog from "../components/Sidebar/LeftSideBarBlog";
import Slider from "../pages/Home/Slider";

export default function MainLayout() {
  const location = useLocation();

  // Kiểm tra xem có đang ở trang chủ không
  const isHomePage = location.pathname === "/";
  return (
    <>
      <Header />
      {isHomePage && <Slider />}
      <section>
        <div className="container">
          <div className="row">
            <LeftSideBarBlog />
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
