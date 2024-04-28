import bcryptjs from "bcryptjs";
import User from "@/lib/models/User";
import { dbConnect } from "@/lib/server/dbConnect";
import { registerSchemaZod } from "@/lib/types/authValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/server/auth";
import { cookies } from "next/headers";
import Diagnosis, { DiagnosisDocument } from "@/lib/models/Diagnosis";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    const validatedBody = registerSchemaZod.safeParse(body.user);

    if (!validatedBody.success) {
      return NextResponse.json({ erorr: "Invalid Fields! " }, { status: 400 });
    }

    const { email, password, username } = validatedBody.data;
    const user = await User.findOne({ username });
    const userEmail = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 400 },
      );
    }

    if (userEmail) {
      return NextResponse.json(
        { error: "Email already exists!" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const sessionData = {
      email: savedUser.email,
      username: savedUser.username,
      id: savedUser._id,
    };

    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ sessionData, expires });

    cookies().set("session", session, {
      expires,
      httpOnly: process.env.NODE_ENV === "production",
    });

    // Save session data to database
    const timestamp = new Date().getTime();
    const randomComponent = Math.random().toString(36).substring(2, 7);

    // Save multiple diagnosis data and analytics to database
    const diagnosisDataArray: Partial<DiagnosisDocument>[] = [];

    for (const key in body.diagnosis) {
      if (Object.prototype.hasOwnProperty.call(body.diagnosis, key)) {
        const diagnosisEntry = body.diagnosis[key];

        const diagnosisData: Partial<DiagnosisDocument> = {
          userId: savedUser._id,
          imageName: `X-RayImage-${timestamp}-${randomComponent}`,
          imageURL: diagnosisEntry.imageUrl,
          diagnosisResult: diagnosisEntry.predicted_label,
          confidenceLevel: diagnosisEntry.confidence_level,
        };

        diagnosisDataArray.push(diagnosisData);
      }
    }

    await Diagnosis.insertMany(diagnosisDataArray);

    console.log("Multiple diagnosis entries saved successfully.");

    const response = NextResponse.json({
      message: "Success",
      success: true,
      user: user,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
