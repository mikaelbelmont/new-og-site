import React from "react";

import { cn } from "@/lib/utils";

type BackgroundProps = {
  children: React.ReactNode;
  variant?: "top" | "bottom";
  className?: string;
};

export const Background = ({
  children,
  variant = "top",
  className,
}: BackgroundProps) => {
  return (
    <div
      className={cn(
        "relative mx-2.5 mt-2.5 lg:mx-4",
        variant === "top" &&
          "rounded-t-4xl rounded-b-2xl bg-linear-to-b via-20%",
        variant === "bottom" &&
          "rounded-t-2xl rounded-b-4xl bg-linear-to-b",
        className,
      )}
      style={
        variant === "top"
          ? {
              background:
                "linear-gradient(to bottom, rgba(71, 139, 194, 0.5), var(--background) 20%, rgba(248, 250, 252, 0.8))",
            }
          : variant === "bottom"
            ? {
                background:
                  "linear-gradient(to bottom, var(--background), var(--background), rgba(71, 139, 194, 0.5))",
              }
            : undefined
      }
    >
      {children}
    </div>
  );
};
