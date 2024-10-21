import { dbConnect } from "../../../utils/dbConnect";
import Car from "../../../models/Car";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const cars = await Car.findAll();
        res.status(200).json({ success: true, data: cars });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const { brand, model, made_year, price } = req.body;
        const car = new Car(null, brand, model, made_year, price);
        const carId = await car.save();
        res.status(201).json({ success: true, data: { id: carId } });
      } catch (error) {
        res.status(400).json({ success: false });
        console.error(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
