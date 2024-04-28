import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://mediscan-flask-api-ytf6jtgsua-as.a.run.app/load_model",
    );

    if (response.data?.error) {
      return NextResponse.json({
        message: "Fail",
        success: false,
        response: response.data?.error,
      });
    }

    return NextResponse.json({
      message: "Success",
      success: true,
      response: response.data?.message,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error,
      success: false,
    });
  }
}
