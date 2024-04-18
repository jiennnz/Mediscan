import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    cookies().set("session", "", { expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 },
    );
  }
}
