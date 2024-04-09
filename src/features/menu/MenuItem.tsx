import { formatCurrency } from "../../utils/helpers";

type MenuItemProps = {
  id : string,
  name : string,
  unitPrice : string,
  ingredients : [],
  soldOut : string,
  imageUrl : string 
}

function MenuItem({ pizza} :any) {
  const {  name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <div>
        <p>{name}</p>
        <p>{ingredients.join(', ')}</p>
        <div>
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
