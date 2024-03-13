import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

const CartIcon = () => (
  <Link to="/cart" className="group -m-2 flex items-center p-2">
    <ShoppingBagIcon
      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
      aria-hidden="true"
    />
    <span className="ml-2 text-sm font-medium">0</span>
  </Link>
);

export default CartIcon;