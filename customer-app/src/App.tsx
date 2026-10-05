import { useEffect, useState } from "react";

import "./App.css";

import MenuItemCard from "./components/MenuItemCard";

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  available: boolean;
  restaurantId: number;
};

function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

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

  return (
  <main className="app">
    <h1>Napoli Pizza</h1>

    {menuItems.map((item) => (
      <MenuItemCard
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        imageUrl={item.imageUrl}
      />
    ))}
  </main>
);
}

export default App;