/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { clearCart, getCart, getTotalCartPrice } from "../cart/CartSlice";
import { useSelector } from "react-redux";
import Button from "../../UI/Button";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: any) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);

function CreateOrder() {
	const [withPriority, setWithPriority] = useState<boolean>(false);
	const navigation = useNavigation();
	const isSubmitting: boolean = navigation.state === "submitting";
	// * For any data
	const username = useSelector((state: any) => state.user.username);
	const formErrors: any = useActionData();
	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const primePrice = withPriority ? totalCartPrice * 0.2 : 0;
	const totalPrice = totalCartPrice + primePrice;

	return (
		<div className='px-4 py-6'>
			<h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

			{/* <Form method="POST" action="/order/new"> */}
			<Form method='POST'>
				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>First Name</label>
					<input
						className='input grow'
						type='text'
						name='customer'
						required
						defaultValue={username}
					/>
				</div>

				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>Phone number</label>
					<div className='grow'>
						<input className='input w-full' type='tel' name='phone' required />
						{formErrors?.phone && (
							<p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
								{formErrors.phone}
							</p>
						)}
					</div>
				</div>

				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>Address</label>
					<div className='grow'>
						<input
							className='input w-full'
							type='text'
							name='address'
							required
						/>
					</div>
				</div>

				<div className='mb-12 flex items-center gap-5'>
					<input
						className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
						type='checkbox'
						name='priority'
						id='priority'
						value={withPriority ? 'true' : 'false'}
						onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label htmlFor='priority' className='font-medium'>
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type='hidden' name='cart' value={JSON.stringify(cart)} />
					<Button disabled={isSubmitting} type='primary'>
						{isSubmitting
							? "Placing order...."
							: `Pay ${formatCurrency(totalPrice)}`}
					</Button>
				</div>
			</Form>
		</div>
	);
}

//  * Will be called after form submit
export async function action({ request }: any) {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);

	const order: any = {
		...data,
		cart: JSON.parse(data.cart),
		priority: data.priority === "true",
	};
	console.log(data, "ME ORDER");
	const errors: any = {};
	if (!isValidPhone(order.phone)) {
		errors.phone = "Please, provide a valid US number. ";
		return errors;
	}
	if (Object.keys(errors).length > 0) return errors;

	//   * Form was filled correctly
	const newOrder = await createOrder(order);

	// * Avoid importing the whole store in order to dispatch
	// ! DO NOT OVERUSER
	store.dispatch(clearCart());
	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
