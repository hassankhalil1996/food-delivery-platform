import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      restaurantId,
      customerName,
      phone,
      address,
      items,
    } = req.body;

    // Get all menu item IDs sent by the customer
    const menuItemIds = items.map(
      (item: { menuItemId: number; quantity: number }) => item.menuItemId
    );

    // Get the real menu items and prices from the database
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
        restaurantId,
        available: true,
      },
    });

    // Calculate the total using database prices
    let totalPrice = 0;

    for (const item of items) {
      const menuItem = menuItems.find(
        (menuItem) => menuItem.id === item.menuItemId
      );

      if (!menuItem) {
        return res.status(400).json({
          error: `Menu item ${item.menuItemId} not found`,
        });
      }

      totalPrice += Number(menuItem.price) * item.quantity;
    }

    // Create the order and its OrderItems
    const order = await prisma.order.create({
      data: {
        restaurantId,
        customerName,
        phone,
        address,
        totalPrice,

        items: {
          create: items.map(
            (item: { menuItemId: number; quantity: number }) => {
              const menuItem = menuItems.find(
                (menuItem) => menuItem.id === item.menuItemId
              )!;

              return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price,
              };
            }
          ),
        },
      },

      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create order",
    });
  }
});

// Update order status
router.patch("/:orderId/status", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update order status",
    });
  }
});


export default router;