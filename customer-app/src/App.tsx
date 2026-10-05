import { useEffect, useState } from "react";
import "./App.css";

import MenuItemCard from "./components/MenuItemCard/MenuItemCard";
import CartBar from "./components/CartBar/CartBar";

import type { MenuItem } from "./types/MenuItem";
import type { CartItem } from "./types/CartItem";


function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/restaurants/1/menu-items")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
      })
      .catch((error) => {
        console.error("Failed to load menu:", error);
      });
  }, []);


  function addToCart(item: MenuItem) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  }

  return (
  <main className="app">
    <header className="restaurant-header">
      <div className="restaurant-logo">🍕</div>

      <div>
        <h1>Napoli Pizza</h1>
        <p className="restaurant-subtitle">
          Fresh pizza • Italian
        </p>
      </div>
    </header>

    <section className="delivery-info">
      <div>
        <span className="info-label">Delivery time</span>
        <strong>25–35 min</strong>
      </div>

      <div>
        <span className="info-label">Delivery</span>
        <strong>₪8</strong>
      </div>

      <div>
        <span className="info-label">Minimum</span>
        <strong>₪40</strong>
      </div>
    </section>

    <section className="menu-section">
      <div className="menu-heading">
        <div>
          <span className="section-label">MENU</span>
          <h2>Popular dishes</h2>
        </div>

        <span className="item-count">
          {menuItems.length} items
        </span>
      </div>

      <div className="menu-list">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            onAdd={() => addToCart(item)}
          />
        ))}
      </div>
    </section>

    <CartBar cart={cart} />
  </main>
);
}

export default App;