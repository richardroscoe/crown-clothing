import {CartItemContainer, ItemDetails, Name, Price} from "./CartItem.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price>{quantity} x ${price}</Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
