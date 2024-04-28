import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Result = {
  predicted_label: string;
  confidence_level: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const url = body.url;

    const result: Result = {
      predicted_label: "none",
      confidence_level: "none",
    };

    const urlData = { url: url };
    const response = await axios.post(
      "https://mediscan-flask-api-ytf6jtgsua-as.a.run.app/diagnose",
      urlData,
      {
        timeout: 30000,
      },
    );

    console.log(response.data);

    result.predicted_label = response.data?.predicted_label;
    result.confidence_level = response.data?.confidence_level;

    return NextResponse.json({
      message: "Success",
      success: true,
      result: result,
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
