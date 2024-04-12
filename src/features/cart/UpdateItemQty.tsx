import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { decreaseItemQty, increaseItemQty } from "./CartSlice";

export const UpdateItemQty = ({pizzaId, currentQty}: any) => {
    const dispatch = useDispatch()
	return (
		<div className="flex gap-2 items-center md:gap-3">
			<Button type='round' onClick={() => dispatch(decreaseItemQty(pizzaId))}>-</Button>
			<span className="text-sm font-medium">{currentQty}</span>
			<Button type='round' onClick={() => dispatch(increaseItemQty(pizzaId))}>+</Button>
		</div>
	);
};
