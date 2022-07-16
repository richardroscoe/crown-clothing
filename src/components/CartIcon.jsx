import { CartIconContainer, ShoppingIcon, ItemCount} from "./CartIcon.styles.jsx";

const CartIcon = ({ clickHandler, itemCount }) => {
  return (
    <CartIconContainer onClick={clickHandler}>
      <ShoppingIcon />
      <ItemCount>{itemCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
