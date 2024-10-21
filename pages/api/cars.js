import { dbConnect } from "../../../utils/dbConnect";
import Car from "../../../models/Car";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { brand, model, made_year, price } = req.body;

      try {
        const car = new Car(null, brand, model, made_year, price); // id NULL로 설정함
        const carId = await car.save();
        res.status(201).json({ success: true, data: { id: carId } });
      } catch (error) {
        console.error("Failed to create car:", error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};
