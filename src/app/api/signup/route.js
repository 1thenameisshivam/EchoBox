import dbConnect from "@/app/config/dbconnect";
import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/app/helpers/sendVerificationEmail";
export const POST = async (req) => {
  await dbConnect();
  try {
    const { email, password, username } = await req.json();
    const existingUserVerifiedByUsername = await User.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        { message: "Username already taken", success: false },
        { status: 400 }
      );
    }
    const existingUserByEmail = await User.findOne({ email });
    const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          { message: "Email already registered", success: false },
          { status: 400 }
        );
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashPassword;
        existingUserByEmail.verifyCode = verifycode;
        existingUserByEmail.verifyCodeExpires = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const user = new User({
        email,
        password: hashPassword,
        username,
        verifyCode: verifycode,
        verifyCodeExpires: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await user.save();
    }
    const emailResponse = await sendVerificationEmail(
      email,
      verifycode,
      username
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        { message: emailResponse.message, success: false },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        message: "User registered successfully please verify your email",
        success: true,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error in registering user" },
      { status: 500 }
    );
  }
};
