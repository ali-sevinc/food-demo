import { useCartContext } from "../../context/CartContext";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CartItem from "./CartItem";

export default function Cart() {
  const { hideCartModal, cartItems, totalAmount, showCheckoutModal } =
    useCartContext();

  return (
    <Modal onClose={hideCartModal}>
      <div className="text-stone-100">
        <h2 className="py-2 text-center text-2xl font-semibold">Your Cart</h2>
        {cartItems.length === 0 && (
          <p className="py-4 text-center">Found no item in your cart.</p>
        )}
        {cartItems.length > 0 && (
          <ul className="overflow-x-hide flex max-h-96 scroll-m-0 scroll-p-0 flex-col gap-4 overflow-y-scroll pb-8 ">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}
        <p className="px-8 pb-8 text-end">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>
        <div className="flex justify-end gap-4 px-8 pb-8">
          <Button type="button" onClick={hideCartModal}>
            Cancel
          </Button>
          {cartItems.length > 0 && (
            <Button type="button" onClick={showCheckoutModal}>
              Checkout
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
