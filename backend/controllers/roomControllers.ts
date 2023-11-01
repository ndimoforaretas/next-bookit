import { NextRequest, NextResponse } from "next/server";
import Room, { IImage, IReview, IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";
import Booking from "../models/booking";
import { delete_file, upload_file } from "../utils/cloudinary";

// Gets all rooms   =>   /api/rooms
export const getAllRooms = catchAsyncErrors(async (req: NextRequest) => {
  const resPerPage: number = 8;
  //const rooms = await Room.find();

  const { searchParams } = new URL(req.url); // gets the search params from the url

  const queryStr: any = {};
  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  }); // converts the search params to an object

  const apiFilters = new APIFilters(Room, queryStr).search().filter(); // creates a new instance of APIFilters and passes the Room model and the queryStr object to it

  let rooms: IRoom[] = await apiFilters.query; // executes the query
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage); // paginates the results
  rooms = await apiFilters.query.clone(); // executes the query again

  return NextResponse.json({
    success: true,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// Path: backend/controllers/roomControllers.ts
// Creates a new room => /api/admin/rooms
export const createARoom = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  body.user = req.user._id;

  const room = await Room.create(body);

  return NextResponse.json({
    success: true,
    room,
  });
});

// Get a single room details   =>   /api/rooms/:id

export const getARoom = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id).populate("reviews.user");

    if (!room) {
      throw new ErrorHandler(404, "Room not found");
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

// Upload room images  =>  /api/admin/rooms/:id/upload_images
export const uploadRoomImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler(404, "Room not found");
    }

    const uploader = async (image: string) =>
      upload_file(image, "bookit/rooms");

    const urls = await Promise.all((body?.images).map(uploader));

    room?.images?.push(...urls);

    await room.save();

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// Delete room image  =>  /api/admin/rooms/:id/delete_image
export const deleteRoomImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler(404, "Room not found");
    }

    const isDeleted = await delete_file(body?.imgId);

    if (isDeleted) {
      room.images = room?.images.filter(
        (img: IImage) => img.public_id !== body.imgId
      );
    }

    await room.save();

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

    // Delete images associated with the room
    for (let i = 0; i < room?.images?.length; i++) {
      await delete_file(room?.images[i].public_id);
    }

    await room.deleteOne();

    return NextResponse.json({
      success: true,
      message: "Room is deleted.",
    });
  }
);

// Create/Update room review  =>  /api/reviews
export const createRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room?.reviews?.find(
    (r: IReview) => r.user?.toString() === req?.user?._id?.toString()
  );

  if (isReviewed) {
    room?.reviews?.forEach((review: IReview) => {
      if (review.user?.toString() === req?.user?._id?.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.reviews.push(review);
    room.numOfReviews = room.reviews.length;
  }

  room.ratings =
    room?.reviews?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.reviews?.length;

  await room.save();

  return NextResponse.json({
    success: true,
  });
});

// Can user review room  =>  /api/reviews/can_review
export const canReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Booking.find({ user: req.user._id, room: roomId });

  const canReview = bookings?.length > 0 ? true : false;

  return NextResponse.json({
    canReview,
  });
});

// Get all rooms - ADMIN  =>  /api/admin/rooms
export const allAdminRooms = catchAsyncErrors(async (req: NextRequest) => {
  const rooms = await Room.find();

  return NextResponse.json({
    rooms,
  });
});

// Get room reviews - ADMIN  =>  /api/admin/rooms/reviews
export const getRoomReviews = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const room = await Room.findById(searchParams.get("roomId"));

  return NextResponse.json({
    reviews: room.reviews,
  });
});

// Delete room review - ADMIN  =>  /api/admin/rooms/reviews
export const deleteRoomReview = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get("roomId");
  const reviewId = searchParams.get("id");

  const room = await Room.findById(roomId);

  const reviews = room.reviews.filter(
    (review: IReview) => review?._id.toString() !== reviewId
  );
  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : room?.reviews?.reduce(
          (acc: number, item: { rating: number }) => item.rating + acc,
          0
        ) / numOfReviews;

  await Room.findByIdAndUpdate(roomId, { reviews, numOfReviews, ratings });

  return NextResponse.json({
    success: true,
  });
});
