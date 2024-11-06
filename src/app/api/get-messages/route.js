import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import User from "@/models/user";
import dbConnect from "@/config/dbconnect";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

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
    const userId = new mongoose.Types.ObjectId(user.id);
    const getUser = await User.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!getUser || getUser.length === 0) {
      return NextResponse.json(
        { message: "No messages found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Messages fetched successfully",
      success: true,
      messages: getUser[0].messages,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error in getting messages", success: false },
      { status: 500 }
    );
  }
};
