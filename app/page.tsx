import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
  title: "Home - BookIT",
  description: "Home page",
};

export const dynamic = "force-dynamic";
const getRooms = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  try {
    const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`);
    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.errMessage) {
    return <Error error={data} />;
  }

  return <Home data={data} />;
}
