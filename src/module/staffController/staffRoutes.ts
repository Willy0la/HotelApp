import staffController from "./staffController";
import express from "express";


const hotelRouter  = express.Router();
hotelRouter.post("/create", staffController.createUser)
hotelRouter.get("/:hotelNumber", staffController.getUserByRoomType);
hotelRouter.put("/:hotelNumber", staffController.updateUsers);


export default hotelRouter;