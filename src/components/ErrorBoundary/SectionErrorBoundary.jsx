import React from 'react';

class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      `SectionErrorBoundary [${this.props.name || 'unknown'}]:`,
      error,
      errorInfo
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto glass-card p-6 rounded-2xl border border-red-500/20">
            <p className="text-sm text-gray-400 font-mono mb-3">
              ⚠️ The <span className="text-[#00E5FF]">{this.props.name || 'Section'}</span> section encountered an error.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-gray-300 hover:text-white hover:border-[#00E5FF] transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
