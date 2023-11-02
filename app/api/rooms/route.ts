// import createEdgeRouter from next-connect;
import dbConnect from "@/backend/config/dbConnect";
import { getAllRooms } from "@/backend/controllers/roomControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getAllRooms);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}
