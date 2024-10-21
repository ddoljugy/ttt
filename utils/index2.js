const express = require("express");
const { dbConnect } = require("../../../utils/dbConnect");
const Car = require("../../../models/Car");
const multer = require("multer");

const app = express();
dbConnect();

app.use(express.json());
const upload = multer({ dest: "uploads/" });

app.post("/api/cars", upload.single("car"), async (req, res) => {
  try {
    const { brand, model, made_year, price } = req.body;
    const car = new Car(null, brand, model, made_year, price);
    const carId = await car.save();
    res.status(201).json({ success: true, data: { id: carId } });
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
});

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(400).json({ success: false });
    console.error(error);
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
