import { Component, type ReactNode, type ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#fff9ef] px-4">
          <div className="rounded-[28px] border border-[#d8e6eb] bg-white p-8 text-center shadow-[0_18px_36px_rgba(15,103,140,0.12)] md:p-10">
            <h1 className="mb-4 text-4xl font-bold text-[#0a5375]">Something went wrong</h1>
            <p className="mb-6 text-[#5d7f8b]">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
            <Link to="/" className="btn-primary">
              Go Back Home
            </Link>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

