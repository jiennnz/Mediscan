"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { MonthlyData } from "@/lib/models/Analytics";
import axios from "axios";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<
    MonthlyData[] | undefined
  >();
  const [totalNormal, setTotalNormal] = useState(0);
  const [totalBacterial, setTotalBacterial] = useState(0);
  const [totalViral, setTotalViral] = useState(0);
  const [totalXray, setTotalXray] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetchAnalyticsData() {
      const response = await axios.get("/api/analytics");
      const dataArray: MonthlyData[] = Object.values(response.data?.data);

      setTotalNormal(response.data?.totalNormal);
      setTotalBacterial(response.data?.totalBacterial);
      setTotalViral(response.data?.totalViral);
      setTotalXray(response.data?.totalXray);
      setAnalyticsData(dataArray);
      console.log(dataArray);
    }

    fetchAnalyticsData();
  }, []);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-[16px] lg:flex-row">
      <div className="h-[40%] w-full rounded-lg bg-white p-[32px] sm:w-[80%] xl:h-[60%] xl:w-[50%] 2xl:h-[60%] 2xl:w-[50%]">
        <h1 className="pl-[8px] text-p font-semibold text-black75">
          {`Diagnosis Summary ${currentYear}`}
        </h1>

        <ResponsiveContainer className="">
          <BarChart
            data={analyticsData}
            margin={{
              top: 40,
              right: 40,
              left: 40,
              bottom: 40,
            }}
          >
            <text
              x="50%"
              y="5%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={18}
              fontWeight="bold"
            >
              Cases Over Time
            </text>
            <Legend verticalAlign="top" align="right" height={32} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              label={{
                value: "Month",
                position: "insideBottom",
                offset: -15,
                fontSize: 16,
                fontWeight: "bold",
                fill: "#1F2B33",
              }}
            />
            <YAxis
              label={{
                value: "Number of Cases",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                fontSize: 16,
                fontWeight: "bold",
                fill: "#1F2B33",
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#F5F5F5", border: "none" }}
              labelStyle={{ fontWeight: "bold" }}
              cursor={{ fill: "#F5F5F5" }}
              formatter={(value: number) =>
                new Intl.NumberFormat().format(value)
              }
            />
            <Bar dataKey="Normal" fill="#00CC99" name="Normal Cases" />
            <Bar dataKey="Bacterial" fill="#9370DB" name="Bacterial Cases" />
            <Bar dataKey="Viral" fill="#CC0200" name="Viral Cases" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="relative hidden h-[60%] w-[30%] flex-wrap items-center gap-[12px] xl:flex">
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Normal</h1>
          <h1 className="text-h2 text-secondary ">{totalNormal || 0}</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Viral</h1>
          <h1 className="text-h2 text-purple">{totalViral || 0}</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Bacterial</h1>
          <h1 className="text-h2 text-error">{totalBacterial || 0}</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">X-Ray Scanned</h1>
          <h1 className="text-h2 text-black">{totalXray || 0}</h1>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
