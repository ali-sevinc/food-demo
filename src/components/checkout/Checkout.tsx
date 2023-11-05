import { FormEvent } from "react";
import { useCartContext } from "../../context/CartContext";
import Button from "../ui/Button";
import InputGroup from "../ui/InputGroup";
import Modal from "../ui/Modal";
import useInput from "../ui/useInput";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function lengthCheck(value: string, length: number) {
  return value.length >= length;
}

export default function Checkout() {
  const { hideCheckoutModal, totalAmount, cartItems, clearCart } =
    useCartContext();

  const {
    value: fullName,
    handleChange: changeFullName,
    isValueInvalid: invalidFullName,
    setIsBlur: blurFullName,
    valueIsValid: fullNameIsValid,
  } = useInput((value) => lengthCheck(value, 5));
  const {
    value: email,
    handleChange: changeEmail,
    isValueInvalid: invalidEmail,
    setIsBlur: blurEmail,
    valueIsValid: emailIsValid,
  } = useInput((value) => emailRegex.test(value));

  const {
    value: address,
    handleChange: changeAddress,
    isValueInvalid: invalidAddress,
    setIsBlur: blurAddress,
    valueIsValid: addressIsValid,
  } = useInput((value) => lengthCheck(value, 10));

  const {
    value: city,
    handleChange: changeCity,
    isValueInvalid: invalidCity,
    setIsBlur: blurCity,
    valueIsValid: cityIsValid,
  } = useInput((value) => lengthCheck(value, 5));

  const {
    value: postalCode,
    handleChange: changePostalCode,
    isValueInvalid: invalidPostalCode,
    setIsBlur: blurPostalCode,
    valueIsValid: postalIsValid,
  } = useInput((value) => lengthCheck(value, 6));

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!fullNameIsValid) {
      blurFullName(true);
      return;
    }
    if (!emailIsValid) {
      blurEmail(true);
      return;
    }
    if (!addressIsValid) {
      blurAddress(true);
      return;
    }
    if (!cityIsValid) {
      blurCity(true);
      return;
    }
    if (!postalIsValid) {
      blurPostalCode(true);
      return;
    }

    /*
    orderData.customer.email === null ||    
    orderData.customer.name === null ||
    orderData.customer.street === null ||
    orderData.customer["postal-code"] === null ||
    orderData.customer.city === null ||
    */

    const order = {
      customer: {
        name: fullName,
        email: email,
        street: address,
        "postal-code": postalCode,
        city: city,
      },
      items: cartItems,
      totalAmount: totalAmount,
    };

    const res = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order }),
    });

    if (!res.ok) {
      return;
    }
    console.log("Placing order... ", order);
    clearCart();
  }

  return (
    <Modal onClose={hideCheckoutModal}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-4 py-8 text-stone-100 md:px-12"
      >
        <h2 className="text-center text-2xl font-semibold">Check Out</h2>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
        <InputGroup
          id="fullName"
          label="full name"
          type="text"
          value={fullName}
          onChange={changeFullName}
          onBlur={blurFullName}
          inputInvalid={invalidFullName ? "Please enter you name" : ""}
        />
        <InputGroup
          id="email"
          label="email address"
          type="email"
          value={email}
          onChange={changeEmail}
          onBlur={blurEmail}
          inputInvalid={invalidEmail ? "Please enter a valid email" : ""}
        />
        <InputGroup
          id="address"
          label="address"
          type="text"
          value={address}
          onChange={changeAddress}
          onBlur={blurAddress}
          inputInvalid={invalidAddress ? "Please enter a valid address" : ""}
        />

        <div className="flex flex-col justify-between md:flex-row">
          <InputGroup
            id="city"
            label="city"
            type="text"
            value={city}
            onChange={changeCity}
            onBlur={blurCity}
            inputInvalid={invalidCity ? "Please enter a valid city" : ""}
          />
          <InputGroup
            id="poastal"
            label="postal code"
            type="text"
            value={postalCode}
            onChange={changePostalCode}
            onBlur={blurPostalCode}
            inputInvalid={
              invalidPostalCode ? "Please enter a valid postalcode" : ""
            }
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={hideCheckoutModal}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Modal>
  );
}
