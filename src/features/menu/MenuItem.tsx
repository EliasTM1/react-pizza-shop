import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQtyById } from "../cart/CartSlice";
import { MenuItemProps } from "../../types/pizza";
import { DeleteItem } from "../cart/DeleteItem";
import { UpdateItemQty } from "../cart/UpdateItemQty";

function MenuItem({
	id,
	name,
	unitPrice,
	ingredients,
	soldOut,
	imageUrl,
}: MenuItemProps) {
	const currentQuantity = useSelector(getCurrentQtyById(id));
	const isInCart = currentQuantity > 0;
	const dispatch = useDispatch();
	const handleAddToCart = () => {
		const newItem = {
			pizzaID: id,
			name,
			quantity: 1,
			unitPrice,
			totalPrice: unitPrice * 1,
		};
		dispatch(addItem(newItem));
	};

	return (
		<li className='flex gap-4 py-2'>
			<img
				src={imageUrl}
				alt={name}
				className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
			/>
			<div className='flex grow flex-col pt-0.5'>
				<p className='font-medium'>{name}</p>
				<p className='text-sm capitalize italic text-stone-500'>
					{ingredients.join(", ")}
				</p>
				<div className='mt-auto flex items-center justify-between'>
					{isInCart && (
						<div className='flex items-center gap-3 sm:gap-8'>
							<UpdateItemQty pizzaId={id} currentQty={currentQuantity} />
							<DeleteItem pizzaId={id} />
						</div>
					)}
					{!soldOut ? (
						<p className='text-sm'>{formatCurrency(unitPrice)}</p>
					) : (
						<p className='text-sm font-medium uppercase text-stone-500'>
							Sold out
						</p>
					)}

					{!soldOut && !isInCart && (
						<div className='flex items-center gap-3 sm:gap-8'>
							<Button onClick={handleAddToCart} type='small'>
								Add to cart
							</Button>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}

export default MenuItem;
