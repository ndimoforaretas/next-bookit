import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

// Gets all rooms   =>   /api/rooms
export const getAllRooms = async (req: NextRequest) => {
  const resPerPage: number = 8;
  const rooms = await Room.find();

  return NextResponse.json({
    success: true,
    resPerPage,
    rooms,
  });
};

// Path: backend/controllers/roomControllers.ts
// Creates a new room => /api/admin/rooms
export const createARoom = async (req: NextRequest) => {
  const body = await req.json();

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
};

// Get a single room details   =>   /api/rooms/:id

export const getARoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
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
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

// Update room details   =>   /api/admin/rooms/:id
export const updateARoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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
};

// Delete room   =>   /api/admin/rooms/:id

export const deleteARoom = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
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
};
