import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => null,
  isOpen: false,
  setIsOpen: () => null,
  cartItemCount: 0,
  cartValue: 0,
});

const updateCartItems = (items, productToAdd) => {
  const itemInCart = items.find((item) => item.id === productToAdd.id);

  // It's in the cart, update the quantity
  if (itemInCart) {
    return items.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  // Its a new item being added to the cart
  return [...items, { ...productToAdd, quantity: 1 }];
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartValue, setCartValue] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((prev, item) => prev + item.quantity, 0);
    setCartItemCount(count);
  }, [cartItems]);
  
  useEffect(() => {
    const value = cartItems.reduce(
      (prev, item) => prev + item.quantity * item.price,
      0
    );
    setCartValue(value);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(updateCartItems(cartItems, productToAdd));
  };

  const incItemQuantity = (id) => {
    const newItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(newItems);
  };

  const decItemQuantity = (id, currentQty) => {
    if (currentQty <= 1 ) 
      return removeCartItem(id)
  
    const newItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(newItems);
  };

  const removeCartItem = (id) => {
    const newItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newItems);
  };

  const value = {
    cartItems,
    addItemToCart,
    cartIsOpen,
    setCartIsOpen,
    cartItemCount,
    cartValue,
    incItemQuantity,
    decItemQuantity,
    removeCartItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
