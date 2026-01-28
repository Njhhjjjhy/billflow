"use client";

import { useMemo } from "react";

interface StatusData {
  label: string;
  value: number;
  color: string;
}

interface StatusChartProps {
  data: StatusData[];
  centerLabel?: string;
  centerValue?: string;
}

export function StatusChart({ data, centerLabel, centerValue }: StatusChartProps) {
  const segments = useMemo(() => {
    const sum = data.reduce((acc, d) => acc + d.value, 0);

    // Calculate cumulative angles without reassignment
    const segs = data.reduce<Array<StatusData & { percentage: number; startAngle: number; endAngle: number }>>(
      (acc, d, index) => {
        const percentage = sum > 0 ? d.value / sum : 0;
        const angle = percentage * 360;
        const startAngle = index === 0 ? -90 : acc[index - 1].endAngle;
        const endAngle = startAngle + angle;

        acc.push({
          ...d,
          percentage,
          startAngle,
          endAngle,
        });

        return acc;
      },
      []
    );

    return segs;
  }, [data]);

  const size = 160;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  const polarToCartesian = (angle: number): { x: number; y: number } => {
    const radians = (angle * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians),
    };
  };

  const createArcPath = (startAngle: number, endAngle: number): string => {
    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
    ].join(" ");
  };

  return (
    <div className="flex items-center gap-6">
      {/* Chart */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--color-bg-tertiary)"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {segments.map((seg) => {
            if (seg.value === 0) return null;

            // Handle full circle case
            if (seg.percentage >= 0.999) {
              return (
                <circle
                  key={seg.label}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  className="transition-all duration-300"
                />
              );
            }

            return (
              <path
                key={seg.label}
                d={createArcPath(seg.startAngle, seg.endAngle - 1)} // -1 for gap
                fill="none"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Center text */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <span
                className="text-2xl font-bold text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {centerValue}
              </span>
            )}
            {centerLabel && (
              <span className="text-xs text-[var(--color-text-tertiary)]">
                {centerLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm border-2 border-black"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {seg.label}
            </span>
            <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
