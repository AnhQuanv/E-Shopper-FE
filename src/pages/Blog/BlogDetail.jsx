import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogDetail } from "../../services/blogService";
import { IMAGE_BASE_URL } from "../../api/axiosClient";
import ResComment from "../../components/Blog/ResComment";
import Comment from "../../components/Blog/Comment";

export default function BlogDetail() {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState(null);
  const [comments, setComments] = useState([]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getBlogDetail(id);
        setBlogDetail(res.data);
        if (res.data.comment) setComments(res.data.comment);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetail();
  }, [id]);
  return (
    <div className="col-sm-9">
      <div className="blog-post-area">
        <h2 className="title text-center">Latest From our Blog</h2>
        {blogDetail ? (
          <div className="single-blog-post" key={blogDetail.id}>
            <h3>{blogDetail.title}</h3>
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
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star-half-o"></i>
              </span>
            </div>
            <a href>
              <img src={`${IMAGE_BASE_URL}${blogDetail.image}`} alt="" />
            </a>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blogDetail.content }}
            />
            <br />
            <div className="pager-area">
              <ul className="pager pull-right">
                <li>
                  <a href="#">Pre</a>
                </li>
                <li>
                  <Link to={`/blog/detail/${blogDetail.id + 1}`}>Next</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p>Đang tải dữ liệu bài viết...</p>
        )}
      </div>
      {/*/blog-post-area*/}
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star color" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
          </li>
          <li className="color">(6 votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <a className="color" href="#">
              Pink <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="#">
              T-Shirt <span>/</span>
            </a>
          </li>
          <li>
            <a className="color" href="#">
              Girls
            </a>
          </li>
        </ul>
      </div>
      {/*/rating-area*/}
      <div className="socials-share">
        <a href="#">
          <img src="frontend/images/blog/socials.png" alt="" />
        </a>
      </div>
      {/*/socials-share*/}
      {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="frontend/images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}
      {/*Comments*/}
      <Comment comments={comments} onAddComment={handleAddComment} />
      {/*/Response-area*/}
      <ResComment replyId={0} onAddComment={handleAddComment} />
      {/*/Repaly Box*/}
    </div>
  );
}
