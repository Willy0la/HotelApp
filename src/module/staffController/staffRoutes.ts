import staffController from "./staffController";
import express from "express";


const hotelRouter  = express.Router();
hotelRouter.post("/create", staffController.createUser)
hotelRouter.get("/:hotelNumber", staffController.getUserByRoomType);


export default hotelRouter;