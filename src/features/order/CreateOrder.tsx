/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useSelector } from "react-redux";
import { getCart } from "../cart/CartSlice";
import Button from "../../UI/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: any) =>
	/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
		str
	);



function CreateOrder() {
	const navigation = useNavigation();
	const isSubmitting: boolean = navigation.state === "submitting";
	// * For any data
	const username =  useSelector((state: any) => state.user.username)
	const formErrors: any = useActionData();

	// const [withPriority, setWithPriority] = useState(false);
	const cart = useSelector(getCart);

	return (
		<div className='px-4 py-6'>
			<h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

			{/* <Form method="POST" action="/order/new"> */}
			<Form method='POST'>
				<div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
					<label className='sm:basis-40'>First Name</label>
					<input className='input grow' type='text' name='customer' required defaultValue={username}/>
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
						// value={withPriority}
						// onChange={(e) => setWithPriority(e.target.checked)}
					/>
					<label htmlFor='priority' className='font-medium'>
						Want to yo give your order priority?
					</label>
				</div>

				<div>
					<input type='hidden' name='cart' value={JSON.stringify(cart)} />
					<Button disabled={isSubmitting} type='primary'>
						{isSubmitting ? "Placing order...." : "Order now"}
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
		priority: data.priority === "on",
	};
	const errors: any = {};
	if (!isValidPhone(order.phone)) {
		errors.phone = "Please, provide a valid US number. ";
		return errors;
	}
	if (Object.keys(errors).length > 1) return errors;

	//   * Form was filled correctly
	console.log( "CALLING")
	const newOrder = await createOrder(order);
	console.log(newOrder, "NUEVA ORDERN")
	return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
