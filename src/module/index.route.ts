import { Router } from "express";
import hotelRouter from "./staffController/staffRoutes";

const router = Router()
router.use("/hotel", hotelRouter )

export default router;