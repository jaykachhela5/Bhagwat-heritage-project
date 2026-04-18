import { memo, type ReactNode } from "react";

interface InnerPageLayoutProps {
  children: ReactNode;
}

export const InnerPageLayout = memo(function InnerPageLayout({ children }: InnerPageLayoutProps) {
  return (
    <div className="inner-page-layout min-h-screen bg-bgIvory text-brown">
      <div className="inner-page-layout__container max-w-7xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
});
