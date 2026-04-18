import { memo, type HTMLAttributes, type ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Card = memo(function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`spiritual-card bg-bgSoft border border-borderCard rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.03] hover:border-gold transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
