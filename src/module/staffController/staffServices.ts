import HotelModel from "../../model/userModel";

import STATUS from "../../constant/constant";

// staffServices.ts

export const findExistingUser = async (fullName: string) => {
  return await HotelModel.findOne({ "userDetail.fullName": fullName });
};

export const createHotelUserService = async (
  userDetail: {
    fullName: string;
    email: string;
    phoneNumber: string;
  },
  roomDetail: {
    roomType: string;
    hotelNumber: number;
  },
  checkIn: string,
  daysOfStay: number
) => {
  // Check if user already exists
  const existingUser = await findExistingUser(userDetail.fullName);
  if (existingUser) {
    const error = new Error("Conflicting resources") as Error & {
      statusCode?: number;
    };
    error.statusCode = STATUS.CONFLICT;
    throw error;
  }

  // Calculate checkOut
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkInDate);
  checkOutDate.setDate(checkOutDate.getDate() + Number(daysOfStay));

  // Create user document
  const newUser = await HotelModel.create({
    userDetail,
    roomDetail,
    checkIn: checkInDate,
    checkOut: checkOutDate,
  });

  return newUser;
};

//getUserbyId

export const getUserByRoomTypeService = async (hotelNumber: number) => {
  const user = await HotelModel.findOne({
    "roomDetail.hotelNumber": hotelNumber,
  });
  return user;
};

export const updateUserByRoomTypeService = async (
  hotelNumber: number,
  updateData: object
) => {
  const user = await HotelModel.findOneAndUpdate(
    { "roomDetail.hotelNumber": hotelNumber },
    updateData,
    { new: true }
  );

  return user;
};
