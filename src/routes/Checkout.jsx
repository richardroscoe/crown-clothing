import {CheckoutContainer, CheckoutHeader, Total, HeaderBlock} from "./Checkout.styles.jsx";

import { useContext } from "react";
import { CartContext } from "../contexts/Cart";
import CheckoutItem from "../components/CheckoutItem";

const Checkout = () => {
  const { cartItems, cartValue } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>Product</HeaderBlock>
        <HeaderBlock>Description</HeaderBlock>
        <HeaderBlock>Quantity</HeaderBlock>
        <HeaderBlock>Price</HeaderBlock>
        <HeaderBlock>Remove</HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}

      <Total>Total: ${cartValue}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
