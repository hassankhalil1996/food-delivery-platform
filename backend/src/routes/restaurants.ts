import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

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

export default router;