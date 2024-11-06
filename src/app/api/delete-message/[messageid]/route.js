import User from "@/models/user";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function DELETE(request, context) {
  // Await params as it is async in Next.js
  const { messageid } = await context.params;

  if (!messageid) {
    return NextResponse.json(
      { success: false, message: "Message ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  try {
    const updateResult = await User.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Message not found or already deleted", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Message deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Server error while deleting message", success: false },
      { status: 500 }
    );
  }
}
