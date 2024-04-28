"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "./sampleData";

const Analytics = () => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-[16px] lg:flex-row">
      <div className="h-[40%] w-full rounded-lg bg-white p-[32px] sm:w-[80%] xl:h-[60%] xl:w-[50%] 2xl:h-[60%] 2xl:w-[50%]">
        <h1 className="pl-[8px] text-p font-semibold text-black75">
          Diagnosis Summary (2023)
        </h1>
        <ResponsiveContainer className="">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <Legend verticalAlign="top" align="right" height={32} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type={"monotone"} dataKey={"Healthy"} stroke="#00CC99" />
            <Line type={"monotone"} dataKey={"Bacterial"} stroke="#9370DB" />
            <Line type={"monotone"} dataKey={"Viral"} stroke="#CC0200" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="relative hidden h-[60%] w-[30%] flex-wrap items-center gap-[12px] xl:flex">
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Normal</h1>
          <h1 className="text-h2 text-secondary ">72676</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Viral</h1>
          <h1 className="text-h2 text-purple">23125</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">Bacterial</h1>
          <h1 className="text-h2 text-error">56363</h1>
        </div>
        <div className="flex h-[50%] w-[48%] flex-col items-center justify-center rounded-lg bg-white">
          <h1 className="text-h6 text-black50">X-Ray Scanned</h1>
          <h1 className="text-h2 text-black">42141</h1>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
