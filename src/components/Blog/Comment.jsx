import React, { useState } from "react";
import { formatDate, formatTime } from "../../utils/format";
import ResComment from "./ResComment";

export default function Comment({ comments, onAddComment }) {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const getAvatarName = (imagePath) => {
    if (!imagePath) return "";
    return imagePath.split("/").pop();
  };

  const handleToggleReply = (commentId) => {
    setActiveReplyId((prevId) => (prevId === commentId ? null : commentId));
  };

  return (
    <div className="response-area">
      <h2>{comments?.length || 0} RESPONSES</h2>
      {comments && comments.length > 0 ? (
        <ul className="media-list">
          {comments
            .filter((item) => Number(item.id_comment) === 0)
            .map((value) => (
              <React.Fragment key={value.id}>
                {/* Comment Cha */}
                <li className="media">
                  <a className="pull-left" href="#">
                    <img
                      className="media-object"
                      src={`http://localhost/laravel/public/upload/user/avatar/${getAvatarName(value.image_user)}`}
                      alt={value.name_user}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li>
                        <i className="fa fa-user" /> {value.name_user}
                      </li>
                      <li>
                        <i className="fa fa-clock-o" />{" "}
                        {formatTime(value.created_at)}
                      </li>
                      <li>
                        <i className="fa fa-calendar" />{" "}
                        {formatDate(value.created_at)}
                      </li>
                    </ul>
                    <p>{value.comment}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleToggleReply(value.id)}
                    >
                      <i className="fa fa-reply" />{" "}
                      {activeReplyId === value.id ? "Cancel" : "Replay"}
                    </button>
                  </div>
                </li>

                {activeReplyId === value.id && (
                  <li style={{ listStyle: "none", paddingLeft: "50px" }}>
                    <ResComment
                      replyId={value.id}
                      onAddComment={onAddComment}
                      onSuccess={() => setActiveReplyId(null)}
                    />
                  </li>
                )}

                {comments
                  .filter(
                    (itemChild) =>
                      Number(itemChild.id_comment) === Number(value.id),
                  )
                  .map((valueChild) => (
                    <React.Fragment key={valueChild.id}>
                      <li className="media second-media" key={valueChild.id}>
                        <a className="pull-left" href="#">
                          <img
                            className="media-object"
                            src={`http://localhost/laravel/public/upload/user/avatar/${valueChild.image_user}`}
                            alt={valueChild.name_user}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                            }}
                          />
                        </a>
                        <div className="media-body">
                          <ul className="sinlge-post-meta">
                            <li>
                              <i className="fa fa-user" />{" "}
                              {valueChild.name_user}
                            </li>
                            <li>
                              <i className="fa fa-clock-o" />{" "}
                              {formatTime(valueChild.created_at)}
                            </li>
                            <li>
                              <i className="fa fa-calendar" />{" "}
                              {formatDate(valueChild.created_at)}
                            </li>
                          </ul>
                          <p>{valueChild.comment}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleToggleReply(valueChild.id)}
                          >
                            <i className="fa fa-reply" />{" "}
                            {activeReplyId === valueChild.id
                              ? "Cancel"
                              : "Replay"}
                          </button>
                        </div>
                      </li>
                      {activeReplyId === valueChild.id && (
                        <li style={{ listStyle: "none", paddingLeft: "100px" }}>
                          <ResComment
                            replyId={value.id}
                            onAddComment={onAddComment}
                            onSuccess={() => setActiveReplyId(null)}
                          />
                        </li>
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
        </ul>
      ) : (
        <p style={{ fontStyle: "italic", padding: "10px 0" }}>
          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </p>
      )}
    </div>
  );
}
