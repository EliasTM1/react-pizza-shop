import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant.ts";
import MenuItem from "./MenuItem";
import { MenuItemProps } from "../../types/pizza.ts";

function Menu() {
	const menu: MenuItemProps[] = useLoaderData();
	return (
		<ul className='divide-y divide-stone-200 px-2'>
			{menu.map(({ id, imageUrl, ingredients, name, soldOut, unitPrice }) => (
				<MenuItem
					id={id}
					imageUrl={imageUrl}
					ingredients={ingredients}
					name={name}
					soldOut={soldOut}
					unitPrice={unitPrice}
					key={id}
				/>
			))}
		</ul>
	);
}

export async function loader() {
	const menu = await getMenu();
	return menu;
}

export default Menu;
