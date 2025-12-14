"use client";

import * as React from "react";

export interface ChartConfig {
  [key: string]: {
    label?: string;
    icon?: React.ComponentType;
    color?: string;
    theme?: {
      light?: string;
      dark?: string;
    };
  };
}

interface ChartContainerProps extends React.ComponentPropsWithoutRef<"div"> {
  config: ChartConfig;
  children: React.ReactElement;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ config, children, className, ...props }, ref) => {
  const chartStyle = React.useMemo(() => {
    const style: Record<string, string> = {};
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        style[`--color-${key}`] = value.color;
      }
    });
    return style;
  }, [config]);

  return (
    <div ref={ref} className={className} style={chartStyle} {...props}>
      {children}
    </div>
  );
});

ChartContainer.displayName = "ChartContainer";

interface ChartTooltipContentProps {
  hideLabel?: boolean;
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

export const ChartTooltip = ({
  children,
}: {
  children?: React.ReactNode;
  cursor?: boolean;
  content?: React.ReactElement;
}) => {
  return <>{children}</>;
};

export const ChartTooltipContent = ({
  hideLabel,
  active,
  payload,
  label,
}: ChartTooltipContentProps) => {
  if (!active || !payload) return null;

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && label && (
        <div className="mb-2 text-xs font-medium">{label}</div>
      )}
      <div className="grid gap-2">
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2 text-xs"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
