import User from "@/app/models/User";
import connect from "@/app/utils/db";
import runMiddleware from "@/app/utils/cors";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import next, { NextApiRequest, NextApiResponse } from "next";

const cors = {
  methods: ["POST", "OPTIONS"],
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

export const POST = async (request: any) => {
  const { username, email, password } = await request.json();

  await connect();

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Failed to create a new user", { status: 500 });
  }
};
