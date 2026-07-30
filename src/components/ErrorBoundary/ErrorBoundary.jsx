import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center p-6 text-center z-[99999] relative">
          <div className="glass-card p-8 rounded-3xl max-w-2xl border border-[#00E5FF]/30 shadow-[0_0_50px_rgba(236,72,153,0.3)]">
            <h2 className="font-heading text-2xl font-bold text-[#00E5FF] mb-2">
              Application Runtime Error
            </h2>
            <p className="text-xs font-mono text-gray-400 mb-4">
              The Error Boundary caught the following error:
            </p>
            <div className="bg-[#050816] p-4 rounded-xl text-left font-mono text-xs text-red-400 overflow-x-auto max-h-60 mb-6 border border-red-500/20">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full btn-primary-gradient text-xs font-semibold"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
