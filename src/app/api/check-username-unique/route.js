import { z } from "zod";
import dbConnect from "@/config/dbconnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { userNameSchema } from "@/validation/signupSchema";

const checkUsernameUniqueSchema = z.object({
  username: userNameSchema,
});

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    // Validate the query parameters
    const result = checkUsernameUniqueSchema.safeParse(queryParam);
    if (!result.success) {
      return NextResponse.json(
        {
          message: result.error.format().username?._errors[0] || [],
          success: false,
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const exestingUser = await User.findOne({ username, isVerified: true });
    if (exestingUser) {
      return NextResponse.json(
        { message: "Username already taken", success: false },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "Username is available",
      success: true,
    });
  } catch (error) {
    console.log("error in checking username", error);
    return NextResponse.json(
      { message: "error in checking username", success: false },
      { status: 500 }
    );
  }
};
