import Analytics, { monthNames, YearlyData } from "@/lib/models/Analytics";
import ImageHash, { ImageHashDocument } from "@/lib/models/ImageHash";
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
    const hash = body.hash;

    const result: Result = {
      predicted_label: "none",
      confidence_level: "none",
    };

    try {
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
    } catch (error: any) {
      let errorMessage = "An error occurred while processing your request. Please try again later.";
  if (error.code === "ECONNABORTED") {
    errorMessage = "The request timed out. Please try again later.";
  }
      console.log(error);
      return NextResponse.json({
        message: "Something went Wrong",
        error: errorMessage,
        success: false,
      });
    }

    const existingImage = await ImageHash.findOne({ imageHash: hash });

    if (!existingImage) {
      // Save new image hash
      const imageHashData: Partial<ImageHashDocument> = {
        imageHash: hash,
        diagnosisResult: result.predicted_label,
        confidenceLevel: result.confidence_level,
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
          defaultAnalyticsData[month] = { Normal: 0, Bacterial: 0, Viral: 0 };
        });

        await Analytics.create({
          year: currentYear,
          data: defaultAnalyticsData,
        });
      }

      // Construct the update object based on the predicted label
      const updateObject = {
        $inc: {
          [`data.${currentMonth}.${result.predicted_label}`]: 1,
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
      result: result,
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
