import { IRoom } from "@/backend/models/room";

interface Props {
  room: IRoom;
}

const RoomFeatures = ({ room }: Props) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
        <p>
          {room?.guestCapacity} {room?.guestCapacity === 1 ? "Guest" : "Guests"}
        </p>
      </div>
      <div className="room-feature">
        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
        <p>
          {room?.numOfBeds}
          {room?.numOfBeds === 1 ? " Bed" : " Beds"}
        </p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isBreakfast
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"></i>
        <p>Breakfast</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isInternet
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"></i>
        <p>Internet</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isAirConditioned
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"></i>
        <p>Air Conditioned</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isPetsAllowed
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"></i>
        <p>Pets Allowed</p>
      </div>
      <div className="room-feature">
        <i
          className={
            room?.isRoomCleaning
              ? "fa fa-check text-success"
              : "fa fa-times text-danger"
          }
          aria-hidden="true"></i>
        <p>Room Cleaning</p>
      </div>
    </div>
  );
};
export default RoomFeatures;
