import CarouselModule from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ImageDetailProduct({ images, userId, onSelectImage }) {
  const Carousel = CarouselModule.default || CarouselModule;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3, // 👉 hiển thị 3 hình cùng lúc
      slidesToSlide: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      arrows={true}
      infinite={true}
      autoPlay={false}
      showDots={false}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
    >
      {images.map((image) => (
        <div
          key={image}
          onClick={() => onSelectImage(image)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`http://127.0.0.1:8000/upload/product/${userId}/${image}`}
            alt="Product"
            style={{
              width: "100%",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
}
export default ImageDetailProduct;
