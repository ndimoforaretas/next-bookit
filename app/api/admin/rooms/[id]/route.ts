import dbConnect from "@/backend/config/dbConnect";
import {
  updateARoom,
  deleteARoom,
} from "@/backend/controllers/roomControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin"));

router.put(updateARoom);
router.delete(deleteARoom);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx) as Promise<Response>;
}
