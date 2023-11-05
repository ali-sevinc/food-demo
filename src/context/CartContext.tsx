import { ReactNode, createContext, useContext, useReducer } from "react";
import { CartType } from "../helpers/types";

type InitialType = {
  cartItems: CartType[];
  totalAmount: number;
  isCartShown: boolean;
  isCheckoutShown: boolean;
  addItemToCart: (food: CartType) => void;
  removeItemFromCart: (id: string) => void;
  showCartModal: () => void;
  hideCartModal: () => void;
  showCheckoutModal: () => void;
  hideCheckoutModal: () => void;
  clearCart: () => void;
};
type ActionType = {
  type:
    | "cart/add"
    | "cart/remove"
    | "cart/clear"
    | "cart/show"
    | "cart/hide"
    | "checkout/show"
    | "checkout/hide";
  id?: string;
  food?: CartType;
};

const initialState: InitialType = {
  cartItems: [],
  totalAmount: 0,
  isCartShown: false,
  isCheckoutShown: false,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  showCartModal: () => {},
  hideCartModal: () => {},
  showCheckoutModal: () => {},
  hideCheckoutModal: () => {},
  clearCart: () => {},
};
const CartContext = createContext(initialState);

function reducer(state: InitialType, action: ActionType) {
  if (action.type === "cart/add") {
    const existedItem = state.cartItems.find(
      (item) => item.id === action.food!.id,
    );
    let updatedItem = [...state.cartItems];
    if (existedItem) {
      updatedItem = updatedItem.map((item) =>
        item.id === existedItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    } else {
      updatedItem.push(action.food!);
    }
    return {
      ...state,
      cartItems: updatedItem,
      totalAmount: state.totalAmount + action.food!.price,
    };
  }
  if (action.type === "cart/remove") {
    const existedItem = state.cartItems.find((item) => item.id === action.id);
    let updatedItem = [...state.cartItems];

    if (existedItem && existedItem?.quantity > 1) {
      updatedItem = updatedItem.map((item) =>
        item.id === existedItem!.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    } else {
      updatedItem = updatedItem.filter((item) => item.id !== existedItem?.id);
    }

    return {
      ...state,
      totalAmount: state.totalAmount - existedItem!.price,
      cartItems: updatedItem,
    };
  }

  if (action.type === "cart/clear") {
    return {
      ...state,
      cartItems: [],
      totalAmount: 0,
      isCheckoutShown: false,
    };
  }

  if (action.type === "cart/show") {
    return {
      ...state,
      isCartShown: true,
    };
  }
  if (action.type === "checkout/show") {
    return {
      ...state,
      isCheckoutShown: true,
      isCartShown: false,
    };
  }
  if (action.type === "cart/hide") {
    return {
      ...state,
      isCartShown: false,
    };
  }
  if (action.type === "checkout/hide") {
    return {
      ...state,
      isCheckoutShown: false,
      isCartShown: true,
    };
  }
  return state;
}

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [{ cartItems, isCartShown, isCheckoutShown, totalAmount }, dispatch] =
    useReducer(reducer, initialState);

  function addItem(food: CartType) {
    dispatch({ type: "cart/add", food });
  }
  function removeItem(id: string) {
    dispatch({ type: "cart/remove", id });
  }
  function clearCart() {
    dispatch({ type: "cart/clear" });
  }

  /*Cart modal */
  function showCart() {
    dispatch({ type: "cart/show" });
  }
  function hideCart() {
    dispatch({ type: "cart/hide" });
  }

  /*Checkout modal */
  function showCheckout() {
    dispatch({ type: "checkout/show" });
  }
  function hideCheckout() {
    dispatch({ type: "checkout/hide" });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartShown,
        isCheckoutShown,
        addItemToCart: addItem,
        removeItemFromCart: removeItem,
        clearCart: clearCart,
        totalAmount,
        showCartModal: showCart,
        hideCartModal: hideCart,
        hideCheckoutModal: hideCheckout,
        showCheckoutModal: showCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const cart = useContext(CartContext);
  return cart;
}
