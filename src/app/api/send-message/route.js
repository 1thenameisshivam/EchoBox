import dbConnect from "@/config/dbconnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    await dbConnect();
    const { username, content } = await req.json();
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    if (!user.isAcceptingMessages) {
      return NextResponse.json(
        { message: "User is not accepting messages", success: false },
        { status: 400 }
      );
    }
    user.messages.push({ message: content, createdAt: new Date() });
    await user.save();
    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
    });
  } catch (err) {
    console.log("error from sendMessage ", err);
    return NextResponse.json(
      { message: "error in sending messages", success: false },
      { status: 500 }
    );
  }
};
