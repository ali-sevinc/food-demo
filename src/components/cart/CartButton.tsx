import { useCartContext } from "../../context/CartContext";

export default function CartButton() {
  const { cartItems, showCartModal } = useCartContext();
  const numItems = cartItems.reduce((cur, item) => cur + item.quantity, 0);

  return (
    <button
      onClick={showCartModal}
      className="rounded-3xl border-2 border-stone-100 bg-stone-800 px-8 py-4 text-2xl font-bold text-stone-100 hover:bg-stone-900 xl:px-12 xl:py-6"
    >
      CART({numItems})
    </button>
  );
}
