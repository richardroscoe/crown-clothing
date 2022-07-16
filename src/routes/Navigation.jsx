import React, { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/crown.svg";
import { UserContext } from "../contexts/User";
import { CartContext } from "../contexts/Cart";
import { signOutUser} from '../utils/firebase'
import CartIcon from "../components/CartIcon";
import CartDropdown from "../components/CartDropdown";

import {NavigationContainer, LogoContainer, NavLink, NavLinks} from "./Navigation.styles.jsx";


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartIsOpen, setCartIsOpen, cartItemCount } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
         <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={async () => {
              await signOutUser()
            }}>
            Sign Out
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sign In
            </NavLink>
          )}
          <CartIcon clickHandler={() => setCartIsOpen(p => !p)} itemCount={cartItemCount}/>
        </NavLinks>
        {cartIsOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
      <div className="my-footer">
          <h1>Footer</h1> 
      </div>
    </Fragment>
  );
};

export default Navigation;
