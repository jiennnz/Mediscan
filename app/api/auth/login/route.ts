import User from "@/lib/models/User";
import { dbConnect } from "@/lib/server/dbConnect";
import { loginSchemaZod } from "@/lib/types/authValidationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { encrypt } from "@/lib/server/auth";
import { cookies } from "next/headers";
import Diagnosis, { DiagnosisDocument } from "@/lib/models/Diagnosis";
import Analytics from "@/lib/models/Analytics";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();
    console.log(body);
    const validatedBody = loginSchemaZod.safeParse(body.user);

    if (!validatedBody.success) {
      return NextResponse.json({ error: "Invalid Fields!" });
    }

    const { username, password } = validatedBody.data;

    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist!" },
        { status: 400 },
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid Username or Password!" },
        { status: 400 },
      );
    }

    const sessionData = {
      email: user.email,
      username: user.username,
      id: user._id,
      avatarLink: user.avatarLink,
    };

    const expires = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ sessionData, expires });

    cookies().set("session", session, {
      expires,
      httpOnly: process.env.NODE_ENV === "production",
    });

    // Save session data to database
    const timestamp = new Date().getTime();

    // Extract current month and year
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const currentYear = new Date().getFullYear();
    const randomComponent = Math.random().toString(36).substring(2, 7);

    // Save multiple diagnosis data and analytics to database
    const diagnosisDataArray: Partial<DiagnosisDocument>[] = [];
    const analyticsUpdateOperations: Record<string, number> = {};

    for (const key in body.diagnosis) {
      if (Object.prototype.hasOwnProperty.call(body.diagnosis, key)) {
        const diagnosisEntry = body.diagnosis[key];

        const diagnosisData: Partial<DiagnosisDocument> = {
          userId: user._id,
          imageName: `X-RayImage-${timestamp}-${randomComponent}`,
          imageURL: diagnosisEntry.imageUrl,
          diagnosisResult: diagnosisEntry.predicted_label,
          confidenceLevel: diagnosisEntry.confidence_level,
        };

        diagnosisDataArray.push(diagnosisData);

        const analyticsKey = `data.${currentMonth}.${diagnosisEntry.predicted_label}`;
        // Increment the analyticsUpdateOperations by 1 for each diagnosis
        analyticsUpdateOperations[analyticsKey] =
          (analyticsUpdateOperations[analyticsKey] || 0) + 1;
      }
    }

    await Diagnosis.insertMany(diagnosisDataArray);

    // Update analytics with $inc operator
    const analyticsUpdate: Record<string, number> = {};
    for (const key in analyticsUpdateOperations) {
      analyticsUpdate[key] = analyticsUpdateOperations[key]; // No error here
    }

    await Analytics.updateOne(
      { year: currentYear },
      { $inc: analyticsUpdate },
      { upsert: true },
    );

    console.log("Multiple diagnosis entries saved successfully.");
    console.log(body.diagnosis);

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
