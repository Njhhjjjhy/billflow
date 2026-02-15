"use client";

import { useMemo, useState, useRef } from "react";
import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";

interface RevenueDataPoint {
  month: string;
  revenue: number;
  paid: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  currency?: string;
}

export function RevenueChart({ data, currency = "NT$" }: RevenueChartProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { maxValue, chartData } = useMemo(() => {
    const max = Math.max(...data.map((d) => Math.max(d.revenue, d.paid)));
    // Round up to nice number
    const niceMax = Math.ceil(max / 100000) * 100000;
    return {
      maxValue: niceMax || 100000,
      chartData: data,
    };
  }, [data]);

  const barWidth = 24;
  const barGap = 8;
  const groupWidth = barWidth * 2 + barGap;
  const chartHeight = 160;
  const chartWidth = data.length * (groupWidth + 20);

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div
      ref={containerRef}
      className="w-full"
      onMouseEnter={() => {
        if (!hasAnimated) setHasAnimated(true);
      }}
    >
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-primary-200)] border-2 border-black" />
          <span className="text-xs text-[var(--color-text-secondary)]">Invoiced</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-primary-600)] border-2 border-black" />
          <span className="text-xs text-[var(--color-text-secondary)]">Paid</span>
        </div>
      </div>

      {/* Chart */}
      <div>
        <svg
          viewBox={`0 0 ${chartWidth + 60} ${chartHeight + 40}`}
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          {/* Y-axis labels */}
          <text
            x={0}
            y={10}
            className="text-[10px] fill-[var(--color-text-tertiary)]"
          >
            {currency}{formatValue(maxValue)}
          </text>
          <text
            x={0}
            y={chartHeight / 2 + 4}
            className="text-[10px] fill-[var(--color-text-tertiary)]"
          >
            {currency}{formatValue(maxValue / 2)}
          </text>
          <text
            x={0}
            y={chartHeight}
            className="text-[10px] fill-[var(--color-text-tertiary)]"
          >
            {currency}0
          </text>

          {/* Grid lines */}
          <line
            x1={50}
            y1={0}
            x2={chartWidth + 50}
            y2={0}
            stroke="var(--color-border-light)"
            strokeDasharray="4,4"
          />
          <line
            x1={50}
            y1={chartHeight / 2}
            x2={chartWidth + 50}
            y2={chartHeight / 2}
            stroke="var(--color-border-light)"
            strokeDasharray="4,4"
          />
          <line
            x1={50}
            y1={chartHeight}
            x2={chartWidth + 50}
            y2={chartHeight}
            stroke="var(--color-border-light)"
          />

          {/* Bars */}
          {chartData.map((d, i) => {
            const x = 60 + i * (groupWidth + 20);
            const revenueHeight = (d.revenue / maxValue) * chartHeight;
            const paidHeight = (d.paid / maxValue) * chartHeight;

            return (
              <g key={d.month}>
                {/* Revenue bar (light) */}
                <motion.rect
                  x={x}
                  width={barWidth}
                  fill="var(--color-primary-200)"
                  stroke="black"
                  strokeWidth={2}
                  rx={2}
                  initial={{ height: 0, y: chartHeight }}
                  animate={
                    hasAnimated
                      ? { height: revenueHeight, y: chartHeight - revenueHeight }
                      : undefined
                  }
                  transition={{
                    duration: duration.slow,
                    ease: ease.out,
                    delay: i * 0.08,
                  }}
                />
                {/* Paid bar (dark) */}
                <motion.rect
                  x={x + barWidth + barGap}
                  width={barWidth}
                  fill="var(--color-primary-600)"
                  stroke="black"
                  strokeWidth={2}
                  rx={2}
                  initial={{ height: 0, y: chartHeight }}
                  animate={
                    hasAnimated
                      ? { height: paidHeight, y: chartHeight - paidHeight }
                      : undefined
                  }
                  transition={{
                    duration: duration.slow,
                    ease: ease.out,
                    delay: i * 0.08 + 0.04,
                  }}
                />
                {/* Month label */}
                <text
                  x={x + groupWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="text-[11px] fill-[var(--color-text-secondary)]"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
