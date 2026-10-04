import express from "express";
import cors from "cors";

import restaurantsRouter from "./routes/restaurants.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Pizza Delivery API is running" });
});

app.use("/restaurants", restaurantsRouter);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});