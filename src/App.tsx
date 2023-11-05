import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Foods from "./components/foods/Foods";
import Header from "./components/layout/Header";
import { useCartContext } from "./context/CartContext";

export default function App() {
  const { isCartShown, isCheckoutShown } = useCartContext();
  return (
    <>
      {isCartShown && <Cart />}
      {isCheckoutShown && <Checkout />}
      <Header />
      <main>
        <Foods />
      </main>
    </>
  );
}
