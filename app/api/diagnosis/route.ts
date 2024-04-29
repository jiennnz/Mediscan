import Diagnosis, { DiagnosisDocument } from "@/lib/models/Diagnosis";
import { getSession } from "@/lib/server/auth";
import { dbConnect } from "@/lib/server/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const session = await getSession();
    const body = await request.json();
    const { diagnoseResult, confidenceLevel, url } = body;

    const id = session?.sessionData?.id;
    const timestamp = new Date().getTime();
    const randomComponent = Math.random().toString(36).substring(2, 7);

    // Create a new Diagnosis document instance
    const diagnosisData: Partial<DiagnosisDocument> = {
      userId: id,
      imageName: `X-RayImage-${timestamp}-${randomComponent}`,
      imageURL: url,
      diagnosisResult: diagnoseResult,
      confidenceLevel: confidenceLevel,
    };

    const newDiagnosis = new Diagnosis(diagnosisData);
    await newDiagnosis.save();

    return NextResponse.json({
      message: "Success",
      success: true,
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error,
      success: false,
    });
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 500 });
    }

    const deletedDiagnosis = await Diagnosis.findByIdAndDelete(id);
    if (!deletedDiagnosis) {
      return NextResponse.json(
        { error: "Diagnosis not found" },
        { status: 500 },
      );
    }

    console.log("deleted diagnosis");

    return NextResponse.json(
      { message: "Diagnosis deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error,
      success: false,
    });
  }
}