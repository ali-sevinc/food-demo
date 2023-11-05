import { useCartContext } from "../../context/CartContext";
import { CartType } from "../../helpers/types";

export default function CartItem({ item }: { item: CartType }) {
  const { addItemToCart, removeItemFromCart } = useCartContext();

  return (
    <li className="flex items-center justify-between px-8">
      <div className="flex w-1/3 items-center justify-between">
        <h3>{item.name}</h3>
        <p>x{item.quantity}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => removeItemFromCart(item.id)}
          className="w-8 bg-stone-100 text-lg text-stone-700 hover:bg-stone-300"
        >
          -
        </button>
        <button
          onClick={() => addItemToCart(item)}
          className="w-8 bg-stone-100 text-lg text-stone-700 hover:bg-stone-300"
        >
          +
        </button>
      </div>
    </li>
  );
}
