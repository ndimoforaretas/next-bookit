"use client";

import { IRoom } from "@/backend/models/room";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import NewReview from "../review/NewReview";
import ListReview from "../review/ListReview";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

interface Props {
  data: {
    room: IRoom;
  };
}

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const RoomDetails = ({ data }: Props) => {
  const { room } = data;

  useEffect(() => {
    const setMap = async () => {
      const coordinates = room?.location?.coordinates;
      const map = new mapboxgl.Map({
        container: "room-map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates,
        zoom: 12,
      });

      // Add marker to the map
      new mapboxgl.Marker({ color: "#e61e4d" })
        .setLngLat(coordinates)
        .addTo(map);
    };
    if (room?.location) setMap();
  }, []);

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
        <span className="no-of-reviews fs-5">
          {room?.numOfReviews} {room?.numOfReviews > 1 ? "Reviews" : "Review"}
        </span>
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

          {room?.location && (
            <div className="my-5">
              <div className="my-2">Room Location:</div>
              <div
                style={{ width: "100%", height: "350px" }}
                id="room-map"
                className="shadow rounded"></div>
            </div>
          )}
        </div>
      </div>

      <NewReview roomId={room?._id} />
      <ListReview reviews={room?.reviews} />
    </div>
  );
};
export default RoomDetails;
