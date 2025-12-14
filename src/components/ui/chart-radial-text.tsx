"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface ChartRadialTextProps {
  correct: number;
  wrong: number;
  total: string;
}

export function ChartRadialText({ correct, wrong }: ChartRadialTextProps) {
  const chartData = [
    {
      name: "Correct",
      value: correct,
      color: "#00BC7D",
    },
    {
      name: "Incorrect",
      value: wrong,
      color: "#EF4444",
    },
  ];

  return (
    <Card className="flex flex-col border shadow-sm w-full">
      <CardHeader className="items-center pb-2">
        <CardDescription className="text-lg text-gray-500">
          Quiz Results
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4 flex flex-col items-center">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={0}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2 text-center w-full">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 bg-[#00BC7D]"></span>
            <span className="text-sm font-medium text-gray-600">
              Correct:{" "}
              <span className="font-bold text-[#00BC7D]">{correct}</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-4 bg-red-500"></span>
            <span className="text-sm font-medium text-gray-600">
              Incorrect: <span className="font-bold text-red-600">{wrong}</span>
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
