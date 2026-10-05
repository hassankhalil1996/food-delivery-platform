export  type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  imageUrl: string | null;
  available: boolean;
  restaurantId: number;
};