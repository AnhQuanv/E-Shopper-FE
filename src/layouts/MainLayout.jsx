import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LeftSideBarBlog from "../components/Sidebar/LeftSideBarBlog";
import Slider from "../pages/Home/Slider";
import LeftSideBarAccount from "../components/Sidebar/LeftSideBarAccount";

export default function MainLayout() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isAccountPage = location.pathname.startsWith("/member/account");
  const isBlogPage = location.pathname.startsWith("/blog");
  return (
    <>
      <Header />
      {isHomePage && <Slider />}
      <section>
        <div className="container">
          <div className="row">
            {isAccountPage && <LeftSideBarAccount />}
            {isBlogPage && <LeftSideBarBlog />}
            <Outlet />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
