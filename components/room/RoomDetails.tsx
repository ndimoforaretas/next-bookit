"use client";

import { IRoom } from "@/backend/models/room";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import NewReview from "../review/NewReview";
import ListReview from "../review/ListReview";

interface Props {
  data: {
    room: IRoom;
  };
}

const RoomDetails = ({ data }: Props) => {
  const { room } = data;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>

      <div className="ratings mt-auto mb-3 d-flex align-items-center">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#e61e4d"
          numberOfStars={5}
          starDimension="22px"
          starSpacing="1px"
          name="rating"
        />
        <span className="no-of-reviews fs-5">{room?.numOfReviews} Reviews</span>
      </div>

      <RoomImageSlider images={room?.images} />

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room?.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
          {/* Room Map - TODO */}
        </div>
      </div>

      <NewReview />
      <ListReview />
    </div>
  );
};
export default RoomDetails;
