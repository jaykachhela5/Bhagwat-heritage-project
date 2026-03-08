import { memo, type ReactNode } from "react";

interface PageSectionShellProps {
  className?: string;
  children: ReactNode;
}

export const PageSectionShell = memo(function PageSectionShell({ className = "", children }: PageSectionShellProps) {
  return <section className={`max-w-6xl mx-auto px-4 ${className}`}>{children}</section>;
});
