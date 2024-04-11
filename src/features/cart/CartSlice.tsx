import { createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
	cart: any[];
};
const initialState: InitialStateProps = {
	cart: [],
	// cart: [
	// 	{
	// 		pizzaID: 12,
	// 		name: "Mediterranean",
	// 		quantity: 2,
	// 		unitPrice: 16,
	// 		totalPrice: 32,
	// 	},
	// ],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			console.log(action.payload);
			state.cart.push(action.payload);
		},
		deleteItem(state, action) {
			state.cart = state.cart.filter((item) => item.pizzaID !== action.payload);
		},
		increaseItemQty(state, action) {
			const item = state.cart.find((item) => item.pizzaID === action.payload);
			console.log(item, "ITEM ADD");
			if (item.quantity) {
				item.quantity++;
				item.totalPrice = item.quantity * item.unitPrice;
			}
		},
		decreaseItemQty(state, action) {
			const item = state.cart.find((item) => item.pizzaID === action.payload);
			if (item) {
				item.quantity--;
				item.totalPrice = item.quantity * item.unitPrice;
			}
		},
		clearCart(state) {
			state.cart = [];
		},
	},
});

export const {
	addItem,
	deleteItem,
	increaseItemQty,
	decreaseItemQty,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state: any) => state.cart.cart;
;

export const getTotalCartQty = (state: any) =>
	state.cart.cart.reduce((sum, item) => {
		console.log(item, "SLICE");
		return sum + item.quantity;
	}, 0);

export const getTotalCartPrice = (state: any) =>
	state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
