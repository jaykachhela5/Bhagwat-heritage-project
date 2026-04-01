import { memo } from "react";

export const LoadingSpinner = memo(function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };
  return (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-[#0f678c]/20 border-t-[#0f678c] rounded-full animate-spin`} />
    </div>
  );
});

