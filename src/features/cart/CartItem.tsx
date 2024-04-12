import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQtyById } from "./CartSlice";
import { DeleteItem } from "./DeleteItem";
import { UpdateItemQty } from "./UpdateItemQty";

function CartItem({ item }) {
	const { pizzaID, name, quantity, totalPrice } = item;
	const currentQty = useSelector(getCurrentQtyById(pizzaID));

	return (
		<li className='py-3 sm:flex sm:items-center sm:justify-between'>
			<p className='mb-1 sm:mb-0'>
				{quantity}&times; {name}
			</p>
			<div className='flex items-center justify-between sm:gap-6'>
				<p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
				<UpdateItemQty pizzaId={pizzaID} currentQty={currentQty} />
				<DeleteItem pizzaId={pizzaID} />
			</div>
		</li>
	);
}

export default CartItem;
