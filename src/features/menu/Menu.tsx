import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
	const menu: unknown = useLoaderData();
	return menu.map((pizza: any, index: any) => {
		return <MenuItem key={index} pizza={pizza}/>;
	});
}

export async function loader() {
	const menu = await getMenu();
	return menu;
}

export default Menu;
