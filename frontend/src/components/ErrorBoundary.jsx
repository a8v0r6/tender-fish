import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-bright p-8">
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md">
            <div className="text-5xl mb-6">⚠️</div>
            <h2 className="text-2xl font-black text-primary mb-3">Something went wrong</h2>
            <p className="text-on-surface-variant mb-6 text-sm">{this.state.error?.message || 'An unexpected error occurred.'}</p>
            <button onClick={() => window.location.reload()} className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-widest hover:brightness-110">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
