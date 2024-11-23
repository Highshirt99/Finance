"use client";

import * as React from "react";
import { AppContext } from "./Provider";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card ";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart ";

export const description = "A donut chart with text";



export function Chart() {
  const { budgets } = React.useContext(AppContext);
  const totalBudgets = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + curr.max, 0);
  }, [budgets]);
  const totalSpent = React.useMemo(() => {
    return budgets.reduce((acc, curr) => acc + curr.spent, 0);
  }, [budgets]);


  const chartData = [
    { browser: "chrome", visitors:  budgets[0].max, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: budgets[1].max, fill: "var(--color-safari)" },
    { browser: "firefox",visitors: budgets[2].max, fill: "var(--color-firefox)" },
    // { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    // { browser: "other", visitors: 190, fill: "var(--color-other)" },
  ];
  const chartConfig = {
    budgets: {
      label: "budget",
    },
    chrome: {
      label: budgets[0].category,
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: budgets[1].category,
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: budgets[2].category,
      color: "hsl(var(--chart-3))",
    },
    // edge: {
    //   label: "Edge",
    //   color: "hsl(var(--chart-4))",
    // },
    // other: {
    //   label: "Other",
    //   color: "hsl(var(--chart-5))",
    // },
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
              dataKey="visitors"
              nameKey="browser"
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
                          className="fill-foreground text-3xl font-bold"
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
