import Home from "@/components/Home";

const getRooms = async () => {
  const res = await fetch("http://localhost:3000/api/rooms");
  return res.json();
};

export default async function HomePage() {
  const rooms = await getRooms();

  return <Home />;
}
