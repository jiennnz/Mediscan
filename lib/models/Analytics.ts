import mongoose, { Document, Model } from "mongoose";

// Define the schema for monthly data
interface MonthlyData {
  [key: string]: number;
  Normal: number;
  Bacterial: number;
  Viral: number;
}

// Define the schema for yearly data
export interface YearlyData {
  [key: string]: MonthlyData;
}

// Define the schema for the Analytics document
interface AnalyticsDocument extends Document {
  year: number;
  data: YearlyData;
}

// Define the schema for Analytics
const AnalyticsSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { strict: false },
);

export const monthNames: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Create the Analytics model
const Analytics: Model<AnalyticsDocument> =
  mongoose.models.Analytics ||
  mongoose.model<AnalyticsDocument>("Analytics", AnalyticsSchema);

export default Analytics;
