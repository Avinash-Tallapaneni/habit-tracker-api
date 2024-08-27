import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  getHabit,
  updateHabit,
} from "../controllers/habitController";

const habitRoutes = Router();

habitRoutes.post("/", createHabit);
habitRoutes.post("/:id/log", updateHabit);
habitRoutes.delete("/:id", deleteHabit);
habitRoutes.get("/", getHabit);

export default habitRoutes;
