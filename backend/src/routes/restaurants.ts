import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// Create restaurant
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
      },
    });

    res.status(201).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create restaurant",
    });
  }
});

// Get restaurant by ID
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get restaurant",
    });
  }
});

// Add menu item to restaurant
router.post("/:id/menu-items", async (req, res) => {
  try {
    const restaurantId = Number(req.params.id);

    const {
      name,
      description,
      price,
      imageUrl,
    } = req.body;

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        restaurantId,
      },
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create menu item",
    });
  }
});

// Get restaurant's menu
router.get("/:id/menu-items", async (req, res) => {
  try {
    const restaurantId = Number(req.params.id);

    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId,
      },
    });

    res.json(menuItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to get menu items",
    });
  }
});

export default router;