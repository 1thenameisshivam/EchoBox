import User from "@/models/user";
import dbConnect from "@/config/dbconnect";
import { verifySchema } from "@/validation/verifySchema";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  try {
    await dbConnect();
    const { code, username } = await req.json();
    const result = verifySchema.safeParse({ code });
    if (!result.success) {
      return NextResponse.json(
        {
          message: result.error.format().code?._errors[0] || [],
          success: false,
        },
        { status: 400 }
      );
    }
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    if (user.isVerified) {
      return NextResponse.json(
        { message: "User already verified", success: false },
        { status: 400 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpires) > new Date();
    if (!isCodeValid || !isCodeExpired) {
      return NextResponse.json(
        {
          message: "Invalid code please signup again to get new code",
          success: false,
        },
        { status: 400 }
      );
    }
    user.isVerified = true;

    await user.save();
    return NextResponse.json(
      { message: "User verification successfully", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error in velidating code", success: false },
      { status: 500 }
    );
  }
};
