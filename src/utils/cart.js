export const getImage = (images) => {
  const imageList = JSON.parse(images);
  return imageList[0];
};
