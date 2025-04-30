import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/message.model";

export async function GET() {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Unauthorized: No session found" },
      { status: 401 }
    );
  }

  // Optional: restrict to admins only
  if (!session.user.isAdmin) {
    return Response.json(
      { success: false, message: "Forbidden: Admins only" },
      { status: 403 }
    );
  }

  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    return Response.json(
      {
        success: true,
        message: "Messages fetched successfully",
        data: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
