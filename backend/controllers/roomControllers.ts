import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";

// Gets all rooms   =>   /api/rooms
export const getAllRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
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
      return NextResponse.json(
        {
          success: false,
          message: "Room not found with this ID",
        },
        {
          status: 404,
        }
      );
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
      return NextResponse.json(
        {
          success: false,
          message: "Room not found with this ID",
        },
        {
          status: 404,
        }
      );
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
      return NextResponse.json(
        {
          success: false,
          message: "Room not found with this ID",
        },
        {
          status: 404,
        }
      );
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Room is deleted.",
    });
  }
);
