import mongoose from "mongoose";
import Room from "../backend/models/room";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Bookaretas:Mama20papa@cluster0.2rzahmy.mongodb.net/bookit"
    );
    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("All Rooms are added.");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
