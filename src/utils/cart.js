export const addToCart = (id) => {
  console.log("id: ", id);
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  cart[id] = (cart[id] || 0) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const getImage = (images) => {
  const imageList = JSON.parse(images);
  return imageList[0];
};
