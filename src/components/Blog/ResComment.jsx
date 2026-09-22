import React, { useState } from "react";
import { postCommentService } from "../../services/blogService";
import { useParams } from "react-router-dom";

export default function ResComment({ onAddComment, replyId = 0, onSuccess }) {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [err, setErr] = useState("");
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

  const handleSendComment = async () => {
    setErr("");

    if (!user) {
      setErr("Vui lòng đăng nhập để bình luận!");
      return;
    }

    if (!content.trim()) {
      setErr("Vui lòng nhập nội dung bình luận!");
      return;
    }
    try {
      const data = {
        id_blog: id,
        id_user: user.Auth?.id,
        name_user: user.Auth?.name,
        image_user: user.Auth?.avatar,
        comment: content,
        id_comment: replyId,
      };
      const token = user.token;
      const res = await postCommentService(data, token);
      if (res?.status === 200) {
        alert("Bình luận thành công!");
        if (onAddComment) {
          onAddComment(res.data);
        }
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log("Lỗi gửi bình luận: ", error);
    }
  };

  return (
    <>
      <div
        className="replay-box"
        style={{ marginTop: replyId !== 0 ? "15px" : "0" }}
      >
        <div className="row">
          <div className="col-sm-12">
            <h2>{replyId === 0 ? "Leave a replay" : "Reply to comment"}</h2>
            <div className="text-area">
              <div className="blank-arrow">
                <label>{user ? user?.Auth?.name : "Your Name"}</label>
              </div>
              <span>*</span>
              <textarea
                name="message"
                rows={replyId === 0 ? 8 : 4}
                defaultValue={""}
                onChange={(e) => setContent(e.target.value)}
              />
              {err && (
                <p
                  style={{
                    color: "red",
                    fontSize: "14px",
                    paddingLeft: "96px",
                  }}
                >
                  {err}
                </p>
              )}
              <button onClick={handleSendComment} className="btn btn-primary">
                Post comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
