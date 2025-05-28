import mongoose, { Date, Document, Schema } from "mongoose";

// Enums for room types and numbers

const enumHotelRoom = ["Small-Room", "Big-Room", "Luxurious-Room"] as const;
const enumHotelRoomNumber = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
] as const;

type hotelRoom = (typeof enumHotelRoom)[number];
type hotelRoomNumber = (typeof enumHotelRoomNumber)[number];

// Interface representing a Hotel document
interface Hotel extends Document {
  userDetail: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };

  roomDetail: {
    roomType: hotelRoom;
    hotelNumber: hotelRoomNumber;
  };
  checkIn:Date;
  checkOut:Date;
}

const HotelSchema = new Schema<Hotel>(
  {
    userDetail: {
      fullName: { type: String, required: true, unique:true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true, unique:true },
    },
    roomDetail: {
      roomType: {
        type: String,
        enum: enumHotelRoom,
        required: true,
        
      },
      hotelNumber: {
        type: Number,
        enum: enumHotelRoomNumber,
        required: true,
        unique:true
      },
    
    },
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true}
  },
  {
    timestamps: true, 
  }
);

// Export the model

const HotelModel = mongoose.model<Hotel>("Hotel", HotelSchema);

export default HotelModel;
