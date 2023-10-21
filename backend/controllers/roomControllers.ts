import { NextRequest, NextResponse } from "next/server";
import Room from "../models/room";

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
// Creates a new room => /api/rooms
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
};

// Update room details   =>   /api/rooms/:id
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
