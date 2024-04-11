import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, getCart } from "./CartSlice";
import CartItem from "./CartItem";
import Button from "../../UI/Button";

function Cart() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const username = useSelector((state: any) => state.user.username);
	const dispatch = useDispatch();
	const cart: any = useSelector(getCart);

	return (
		<div className='px-4 py-3'>
			<Link to='/menu'>&larr; Back to menu</Link>

			<h2 className='mt-7 text-xl font-semibold'>
				Your cart, {String(username).toUpperCase()}
			</h2>

			<ul className='mt-3 divide-y divide-stone-200 border-b'>
				{cart.map((item, index) => (
					<CartItem item={item} key={index} />
				))}
			</ul>

			<div className='mt-6 space-x-2'>
				<Button to='/order/new' type='primary'>
					Order pizzas
				</Button>

				<Button type='secondary' onClick={() => dispatch(clearCart())}>
					Clear cart
				</Button>
			</div>
		</div>
	);
}

export default Cart;
