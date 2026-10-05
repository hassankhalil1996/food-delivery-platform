import { useEffect, useState } from "react";
import "./App.css";

import MenuItemCard from "./components/MenuItemCard/MenuItemCard";

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
      <h1>Napoli Pizzabc</h1>

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
    </main>
  );
}

export default App;