import Analytics, { monthNames, YearlyData } from "@/lib/models/Analytics";
import ImageHash, { ImageHashDocument } from "@/lib/models/ImageHash";
import { dbConnect } from "@/lib/server/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  dbConnect();
  try {
    const body = await request.json();
    const { hash, diagnoseResult, confidenceLevel } = body;

    const existingImage = await ImageHash.findOne({ imageHash: hash });

    if (!existingImage) {
      // Save new image hash
      const imageHashData: Partial<ImageHashDocument> = {
        imageHash: hash,
        diagnosisResult: diagnoseResult,
        confidenceLevel: confidenceLevel,
      };

      const newImageHash = new ImageHash(imageHashData);
      await newImageHash.save();

      // Save prediction result to Analytics
      const currentYear = new Date().getFullYear();
      const currentMonth = monthNames[new Date().getMonth()];

      // Check if there is a document for the analytics
      const analyticsExists = await Analytics.exists({ year: currentYear });

      // If the document doesn't exist, create one with default values for all months
      if (!analyticsExists) {
        const defaultAnalyticsData: YearlyData = {};
        monthNames.forEach((month) => {
          defaultAnalyticsData[month] = {
            month: month,
            Normal: 0,
            Bacterial: 0,
            Viral: 0,
          };
        });

        await Analytics.create({
          year: currentYear,
          data: defaultAnalyticsData,
        });
      }

      // Construct the update object based on the predicted label
      const updateObject = {
        $inc: {
          [`data.${currentMonth}.${diagnoseResult}`]: 1,
        },
      };

      // Update the document or create a new one if it doesn't exist
      await Analytics.updateOne({ year: currentYear }, updateObject, {
        upsert: true,
      });
    } else {
      console.log("Image already exists:", hash);
    }

    const response = NextResponse.json({
      message: "Success",
      success: true,
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Internal Server Error",
      error: error,
      success: false,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const currentYear = new Date().getFullYear();
    const analyticsData = await Analytics.findOne({ year: currentYear });

    if (!analyticsData) {
      return NextResponse.json(
        {
          message: `No data for year ${currentYear}`,
          success: true,
        },
        {
          status: 404,
        },
      );
    }

    const { data } = analyticsData;

    let totalNormal = 0;
    let totalBacterial = 0;
    let totalViral = 0;

    for (const monthData of Object.values(data)) {
      totalNormal += monthData.Normal;
      totalBacterial += monthData.Bacterial;
      totalViral += monthData.Viral;
    }

    const totalXray = totalNormal + totalBacterial + totalViral;

    return NextResponse.json({
      message: `${currentYear} data successfully retrieved`,
      success: true,
      data: data,
      totalNormal: totalNormal,
      totalBacterial: totalBacterial,
      totalViral: totalViral,
      totalXray: totalXray,
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