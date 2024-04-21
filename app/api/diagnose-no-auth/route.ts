import Analytics, { monthNames, YearlyData } from "@/lib/models/Analytics";
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

    try {
      const urlData = { url: url };
      const response = await axios.post(
        "https://mediscan-flask-api-ytf6jtgsua-as.a.run.app/diagnose",
        urlData,
      );

      console.log(response.data);

      result.predicted_label = response.data?.predicted_label;
      result.confidence_level = response.data?.confidence_level;

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
    } catch (error) {
      return NextResponse.json({
        message: "Something went Wrong",
        error: error,
      });
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
    });
  }
}
