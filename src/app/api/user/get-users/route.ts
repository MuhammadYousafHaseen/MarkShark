import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/user.model";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    const users = await User.find().select("-password").lean();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Server error while fetching users" },
      { status: 500 }
    );
  }
};
