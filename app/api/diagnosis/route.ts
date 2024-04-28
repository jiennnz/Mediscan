import Diagnosis, { DiagnosisDocument } from "@/lib/models/Diagnosis";
import { getSession } from "@/lib/server/auth";
import { dbConnect } from "@/lib/server/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  dbConnect();
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
  } catch (error) {}
}
