import { Component, type ReactNode } from "react";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        try {
            const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
            w.dataLayer = w.dataLayer || [];
            w.dataLayer.push({
                event: "AppError",
                errorMessage: error?.message,
                errorStack: error?.stack?.slice(0, 500),
                componentStack: errorInfo?.componentStack?.slice(0, 500),
            });
        } catch { /* silent */ }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center text-center px-6">
                    <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                        <span className="text-2xl">⚠</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Algo deu errado</h2>
                    <p className="text-gray-400 text-sm mb-6 max-w-sm">
                        Ocorreu um erro inesperado. Clique abaixo para recarregar e continuar.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#0030fd] hover:bg-[#0026cc] text-white font-bold px-8 py-3 rounded-xl transition-colors"
                    >
                        RECARREGAR PÁGINA
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
