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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-[#0d3b66] mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
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
