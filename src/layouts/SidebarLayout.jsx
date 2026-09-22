import { Outlet } from "react-router-dom";
import LeftSideBarBlog from "../components/Sidebar/LeftSideBarBlog";

export default function SidebarLayout() {
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <LeftSideBarBlog />
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}
