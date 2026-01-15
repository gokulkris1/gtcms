import { NAMES } from "helper/constant";
import React from "react";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie
} from "recharts";

const COLORS1 = [
  "#49af4c",
  "#ede53d",
  "#f8ba41",
  "#ed7d5f",
  "#e62e7b",
  "#183570",
  "#1f4999",
  "#6ea4d9",
  "#6dbe99"
];

const COLORS2 = ["#EC6B56", "#FFC154", "#47B39C", "#fdba74", "#4ade80"];

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="fs-18 pa-6 bg-white border-radius-6 border-gray">
        {NAMES[payload[0].name]} ({payload[0].value})
      </div>
    );
  }

  return null;
};

export const DashboardChart = ({
  data,
  type = "BAR",
  isReceipt = false,
  handleReceiptClick,
  outerRadius = 100
}) => {
  const mapData = useMemo(() => {
    {
      return data
        .filter(el => el.count !== 0)
        .map(data => ({
          name: data.name,
          userCount: data.count
        }));
    }
  }, [data]);

  return (
    <>
      {type === "BAR" && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={100}
            height={300}
            data={mapData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey={"userCount"} />
            <Tooltip />
            <Legend />
            <Bar dataKey="userCount" fill="#39B54A">
              {mapData.map((mood, index) => (
                <>
                  <Cell key={`cell-${index}`} fill={COLORS1[index]} />
                </>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      {type === "LINE" && (
        <ResponsiveContainer>
          <LineChart
            width={100}
            height={300}
            data={mapData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="userCount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
      {type === "PIE" && (
        <ResponsiveContainer>
          <PieChart width={100} height={300}>
            <Pie
              data={mapData}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomizedLabel}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="userCount"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index
              }) => {
                // eslint-disable-next-line
                const radius = 25 + innerRadius + (outerRadius - innerRadius);
                // eslint-disable-next-line
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                // eslint-disable-next-line
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#8884d8"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {NAMES[mapData[index].name]} ({value})
                  </text>
                );
              }}
            >
              {mapData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS1[index]}
                  role="button"
                  onClick={() => handleReceiptClick(entry, isReceipt)}
                />
              ))}
            </Pie>
            <Tooltip cursor={false} content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
