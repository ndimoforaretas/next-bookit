import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";

// Gets all rooms   =>   /api/rooms
export const getAllRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;
  //const rooms = await Room.find();

  const { searchParams } = new URL(req.url); // gets the search params from the url

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  }); // converts the search params to an object

  const roomsCount = await Room.countDocuments(); // gets the total number of rooms

  const apiFilters = new APIFilters(Room, queryStr).search().filter(); // creates a new instance of APIFilters and passes the Room model and the queryStr object to it

  let rooms: IRoom[] = await apiFilters.query; // executes the query
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage); // paginates the results
  rooms = await apiFilters.query.clone(); // executes the query again

  return NextResponse.json({
    success: true,
    roomsCount,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// Path: backend/controllers/roomControllers.ts
// Creates a new room => /api/admin/rooms
export const createARoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get a single room details   =>   /api/rooms/:id

export const getARoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler(404, "Room not found with this ID");
    }

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Update room details   =>   /api/admin/rooms/:id
export const updateARoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler(404, "Room not found with this ID");
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room   =>   /api/admin/rooms/:id

export const deleteARoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler(404, "Room not found with this ID");
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Room is deleted.",
    });
  }
);
