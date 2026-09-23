import { useCallback, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { getRateService, postRateService } from "../../services/blogService";

export default function Rate({ id }) {
  const [rating, setRating] = useState(0);
  const [listRating, setListRating] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
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
  const handleRating = (rate) => {
    if (!user) {
      alert("Vui lòng đăng nhập để đánh giá blog!");
      return;
    }

    if (hasVoted) {
      alert("Bạn đã đánh giá bài viết này rồi, không thể đánh giá lại!");
      return;
    }

    if (rate) {
      const isConfirmed = window.confirm(
        `Bạn có chắc chắn muốn đánh giá bài viết này ${rate} sao không?`,
      );
      if (!isConfirmed) {
        return;
      }
    }

    submitRating(rate);
  };
  const submitRating = async (selectedRate) => {
    try {
      const data = {
        blog_id: id,
        user_id: user.Auth?.id,
        rate: selectedRate,
      };
      const res = await postRateService(data, user.token);
      if (res.status === 200) {
        alert("Đánh giá thành công!");
      }
      setRating(selectedRate);
      setHasVoted(true);
      fetchRate();
      console.log("res rate: ", res);
    } catch (error) {
      console.log("Lỗi đánh giá blog: ", error);
    }
  };
  const fetchRate = useCallback(async () => {
    if (id) {
      try {
        const res = await getRateService(id);
        if (res.response === "success" && res.data) {
          const ratingList = Array.isArray(res.data)
            ? res.data
            : Object.values(res.data);

          setListRating(ratingList);

          if (ratingList.length > 0) {
            const totalStars = ratingList.reduce(
              (acc, item) => acc + (Number(item.rate) || 0),
              0,
            );

            const average = (totalStars / ratingList.length).toFixed(1);
            setAvgRating(Number(average));

            const currentUserId = user?.Auth?.id || user?.id;
            const currentUserRate = ratingList.find(
              (item) => item.user_id === currentUserId,
            );

            if (currentUserRate) {
              setRating(currentUserRate.rate);
              setHasVoted(true);
            } else {
              setHasVoted(false);
            }
          } else {
            setAvgRating(0);
            setHasVoted(false);
          }
        }
      } catch (error) {
        console.log("Lỗi lấy dữ liệu api rate: ", error);
      }
    }
  }, [id, user]);
  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  return (
    <div
      className="rating-area"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ul
        className="ratings"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li className="rate-this">Rate this item:</li>
        <li style={{ display: "flex", alignItems: "center" }}>
          <Rating
            onClick={handleRating}
            initialValue={rating}
            size={35}
            transition
            fillColor="gold"
            emptyColor="gray"
          />
        </li>
        {listRating.length > 0 && (
          <li className="color">
            ({avgRating} - {listRating.length} votes)
          </li>
        )}
      </ul>

      <ul
        className="tag"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
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
  );
}
