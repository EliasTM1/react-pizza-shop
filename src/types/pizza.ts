export type Pizza = {
	name: string;
	pizzaID: number;
	quantity: number;
	totalPrice: number;
	unitPrice: number;
};


export type MenuItemProps = {
	id: string;
	name: string;
	unitPrice: number;
	ingredients: string[];
	soldOut: string;
	imageUrl: string;
};