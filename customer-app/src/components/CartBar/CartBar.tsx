import "./CartBar.css";

import type { CartItem } from "../../types/CartItem";

type CartBarProps = {
  cart: CartItem[];
};

function CartBar({ cart }: CartBarProps) {
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="cart-bar">
      <div className="cart-summary">
        <span className="cart-count">
          🛒 {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>

        <span className="cart-total">₪{totalPrice}</span>
      </div>

      <button className="view-cart-button">
        View cart
      </button>
    </div>
  );
}

export default CartBar;