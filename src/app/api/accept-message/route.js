import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/user";
import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      return NextResponse.json(
        { message: "Not Authenticated", success: false },
        { status: 401 }
      );
    }
    const { acceptMessages } = await req.json();
    const userId = user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isAcceptingMessages: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: `Messages accepting ${acceptMessages ? "on" : "off"} `,
      success: true,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error in accepting messages", success: false },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      return NextResponse.json(
        { message: "Not Authenticated", success: false },
        { status: 401 }
      );
    }
    const userId = user.id;
    const userInfo = await User.findOne({ _id: userId });
    if (!userInfo) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Messages status fetched successfully",
      success: true,
      isAcceptingMessages: userInfo.isAcceptingMessages,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error in getting messages status", success: false },
      { status: 500 }
    );
  }
};
