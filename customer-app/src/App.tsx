import { useEffect, useState } from "react";

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
    <div>
      <h1>Napoli Pizza</h1>

      {menuItems.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>₪{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;