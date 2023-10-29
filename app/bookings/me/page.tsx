const page = () => {
  return <div>page</div>;
};

import Error from "@/app/error";
import MyBookings from "@/components/booking/MyBookings";
import { getAuthHeader } from "@/helpers/authHeader";

export const metadata = {
  title: "My Bookings",
  description: "Bookings page",
};

export const dynamic = "force-dynamic";
const getBookings = async () => {
  const authHeader = getAuthHeader();
  const res = await fetch(`${process.env.API_URL}/api/bookings/me`, authHeader);
  return res.json();
};

export default async function MyBookingsPage() {
  const data = await getBookings();

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <MyBookings data={data} />;
}
