import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("action: ", 1);

      console.log("action: ", action);
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    increaseQuality: (state, action) => {
      const id = action.payload;
      state.items[id] += 1;
    },

    decreaseQuality: (state, action) => {
      const id = action.payload;
      if (state.items[id] > 1) {
        state.items[id] -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const confirmDelete = window.confirm(
        "Bạn có chắc muốn xoá sản phẩm này không ?",
      );
      if (!confirmDelete) return;
      const id = action.payload;
      delete state.items[id];
    },
  },
});

export const { addToCart, increaseQuality, decreaseQuality, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
