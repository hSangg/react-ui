const {createSlice} = require('@reduxjs/toolkit');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },
    hideMiniCart(state) {
      state.showMiniCart = false;
    },
    deleteItem(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== id);
    },
    addNewItem(state, action) {
      const newItem = action.payload;

      const currentIndex = state.cartItems.findIndex(
        (x) => x.id === newItem.id
      );

      if (currentIndex >= 0)
        state.cartItems[currentIndex].quantity += newItem.quantity;
      else state.cartItems.push(newItem);
    },
    setQuantity(state, action) {
      const {id, quantity} = action.payload;
      const index = state.cartItems.findIndex((x) => x.id === id);
      state.cartItems[index].quantity = quantity;
    },
  },
});

const {actions, reducer} = cartSlice;
export const {showMiniCart, hideMiniCart, addNewItem, deleteItem, setQuantity} =
  actions;
export default reducer;
