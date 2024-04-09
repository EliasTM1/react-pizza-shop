import { Link } from "react-router-dom"
import { SearchOrder } from "../features/order/SearchOrder"

export const Header = () => {
  return (
    <div>
        <Link to="/">Fast react pizza company</Link>
        <SearchOrder/>
    </div>
  )
}
