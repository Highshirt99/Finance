"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/components/ui/card ";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart ";
import { useSelector } from "react-redux";

export const description = "A donut chart with text";

export function getRandomColor() {
  // Generate a random integer between 0 and 16777215 (hexadecimal #FFFFFF)
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  // Pad with leading zeros if necessary and prepend with #
  return `#${randomColor.padStart(6, "0")}`;
}

export function Chart({ chartData }) {
  const budgets = useSelector(state => state.finance.user.budgets)

  const data = chartData?.map((item, index) => {
    return {
      [item.category]: {
        label: item.category,
        color: getRandomColor(),
      },
    };
  });

  const totalBudgets = React.useMemo(() => {
    return budgets.length > 0
      ? budgets.reduce((acc, curr) => acc + Number(curr.max), 0)
      : 0;
  }, [budgets]);
  const totalSpent = React.useMemo(() => {
    return budgets.length > 0
      ? budgets.reduce((acc, curr) => acc + Number(curr.spent), 0)
      : 0;
  }, [budgets]);

  const chartConfig = {
    budget: {
      labels: budgets?.length > 0 ? budgets.map((item) => item.category) : [],
    },

    ...data,
  };

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-square mx-auto h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="budget"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-bold fill-foreground"
                        >
                          ${totalSpent.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          of ${totalBudgets} limit
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
