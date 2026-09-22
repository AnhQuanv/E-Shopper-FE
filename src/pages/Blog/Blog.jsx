import { useEffect, useState } from "react";
import { getBlogList } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../api/axiosClient";
import { Link } from "react-router-dom";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogList();
        setBlog(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {blog.length > 0 ? (
          blog.map((item) => (
            <div className="single-blog-post" key={item.id}>
              <h3>{item.title}</h3>
              <div className="post-meta">
                <ul>
                  <li>
                    <i className="fa fa-user" /> Mac Doe
                  </li>
                  <li>
                    <i className="fa fa-clock-o" /> 1:33 pm
                  </li>
                  <li>
                    <i className="fa fa-calendar" /> DEC 5, 2013
                  </li>
                </ul>
                <span>
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" />
                </span>
              </div>
              <a>
                <img src={`${IMAGE_BASE_URL}${item.image}`} alt="" />
              </a>
              <p>{item.description}</p>
              <Link className="btn btn-primary" to={`/blog/detail/${item.id}`}>
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>Đang tải dữ liệu bài viết...</p>
        )}

        <div className="pagination-area">
          <ul className="pagination">
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-angle-double-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
