import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CartItemCard({cartItemProp, removeFromCart}) {
	const { productId, subtotal } = cartItemProp;
	const { _id, name, description } = productId;

  // const token = localStorage.getItem('token');
  // const apiUrl = process.env.REACT_APP_API_URL;

  // const removeFromCart = async (_id) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/b3/cart/${_id}/removeFromCart`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     const data = await response.json();

  //     console.log(data);

  //     if (response.ok) {
  //       setCart(data.cart);
  //       setTotal(data.cart.totalPrice);
  //       toast.info('Product removed from cart');
  //     } else {
  //       toast.error(data.message);
  //     }

  //   } catch (err) {
  //     console.error('Error removing product from cart: ', err);
  //     toast.error('Internal Server Error!');
  //   }
  // };

  return (
    <div className="card bg-white shadow-xl group relative overflow-hidden rounded-xl grid grid-cols-2 sm:grid-cols-5 items-center">
                
      <div className="hidden sm:block sm:col-span-2 p-5">
        {/* Image placeholder */}
        <div className="bg-gradient-to-br from-black/30 to-black/20 rounded-xl relative h-[180px] w-[180px] flex P-5 group-hover:opacity-75">
        </div>
      </div>

      <div className="card-body col-span-2 sm:col-span-3 p-8">
        <h2 className="card-title text-md font-medium text-primary">{name}</h2>
        <p className="mt-1 text-sm text-black">{description}</p>
        <p className="font-bold text-2xl">Sub-Total : <span className="text-secondary">₱{subtotal}</span></p>
        <div className="card-actions justify-end">
          <Link className="btn btn-outline btn-primary rounded-xl" to={`/shop/${_id}`}>Details</Link>
          <button onClick={() => removeFromCart(_id)} className="btn btn-error btn-outline rounded-xl">Remove</button>
        </div>
      </div>

    </div>
  );
}