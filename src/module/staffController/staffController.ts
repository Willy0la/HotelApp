import STATUS from "../../constant/constant";
import { TRouteHandler } from "../../types";
import { Request, Response, NextFunction } from "express";
import {
  createHotelUserService,
  getUserByRoomTypeService,
  updateUserByRoomTypeService,
} from "./staffServices";

const createUser: TRouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userDetail, roomDetail, checkIn, daysOfStay } = req.body;

    if (!userDetail || !roomDetail || !checkIn || !daysOfStay) {
      const error = new Error("Kindly input the required fields") as Error & {
        statusCode?: number;
      };
      error.statusCode = STATUS.BAD_REQUEST;
      return next(error);
    }

    const newUser = await createHotelUserService(
      userDetail,
      roomDetail,
      checkIn,
      daysOfStay
    );

    return res.status(201).json({
      title: "Welcome User",
      data: { newUser },
    });
  } catch (error: any) {
    console.error("Actual error creating user:", error);
    const customError = new Error("Unable to create new user") as Error & {
      statusCode: number;
    };
    customError.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    return next(customError);
  }
};

const getUserByRoomType: TRouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotelNumberParam = req.params.hotelNumber;

    if (!hotelNumberParam || isNaN(Number(hotelNumberParam))) {
      const error = new Error("Invalid or missing hotel number") as Error & {
        statusCode: number;
      };
      error.statusCode = STATUS.BAD_REQUEST;
      return next(error);
    }

    const hotelNumber = Number(hotelNumberParam);

    const user = await getUserByRoomTypeService(hotelNumber);

    if (!user) {
      const error = new Error("This room does not exist") as Error & {
        statusCode: number;
      };
      error.statusCode = STATUS.NOT_FOUND;
      return next(error);
    }

    return res.status(200).json({
      title: "User has been retrieved",
      data: { user },
    });
  } catch (error) {
    console.error("Actual Error", error);
    const customError = new Error("Unable to get user") as Error & {
      statusCode: number;
    };
    customError.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    return next(customError);
  }
};

const updateUsers: TRouteHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = req.body;
    const hotelNumber = Number(req.params.hotelNumber);

    if (isNaN(hotelNumber)) {
      const error = new Error("Invalid hotel number provided") as Error & {
        statusCode: number;
      };
      error.statusCode = STATUS.BAD_REQUEST;
      return next(error);
    }

    // Recalculate checkOut if checkIn and daysOfStay are present
    const { checkIn, daysOfStay } = updateData;
    if (checkIn && daysOfStay) {
      const checkOutDate = new Date(checkIn);
      checkOutDate.setDate(checkOutDate.getDate() + Number(daysOfStay));
      updateData.checkOut = checkOutDate;
    }

    const userUpdate = await updateUserByRoomTypeService(hotelNumber, updateData);

    if (!userUpdate) {
      const error = new Error("User does not exist") as Error & {
        statusCode: number;
      };
      error.statusCode = STATUS.NOT_FOUND;
      return next(error);
    }

    return res.status(200).json({
      title: "User request Updated",
      data: userUpdate,
    });
  } catch (error) {
    console.error("Actual error:", error);
    const customError = new Error("Unable to update user") as Error & {
      statusCode: number;
    };
    customError.statusCode = STATUS.INTERNAL_SERVER_ERROR;
    return next(customError);
  }
};


export default { getUserByRoomType, createUser, updateUsers };
