import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import CreateOrder, {
	action as createOrderAction,
} from "./features/order/CreateOrder";
import Order, { laoder } from "./features/order/Order";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/menu",
				element: <Menu />,
				loader: menuLoader,
				errorElement: <Error />,
			},
			{
				path: "/order/new",
				element: <CreateOrder />,
				action: createOrderAction,
			},
			{
				path: "/order/:orderId",
				element: <Order />,
				errorElement: <Error />,
				loader: laoder,
			},
		],
	},
]);
function App() {
	return <RouterProvider router={router} />;
}

export default App;
