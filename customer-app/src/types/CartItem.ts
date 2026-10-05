import type { MenuItem } from "./MenuItem";

export type CartItem = MenuItem & {
  quantity: number;
};