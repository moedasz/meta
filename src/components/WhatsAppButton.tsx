import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

const PHONE = "551131641004";

export function WhatsAppButton() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const tooltipTimer = setTimeout(() => {
            if (!hasScrolled) {
                setShowTooltip(true);
            }
        }, 5000);

        const hideTooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 13000);

        const handleScroll = () => {
            setHasScrolled(true);
            if (window.scrollY > 300) {
                setShowTooltip(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(tooltipTimer);
            clearTimeout(hideTooltipTimer);
        };
    }, [hasScrolled]);

    const handleWhatsAppClick = () => {
        window.open(
            `https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de um orçamento para meu caso.")}`,
            "_blank"
        );
    };

    return (
        <>
            {/* Desktop: Floating button with expandable message */}
            <div className="fixed bottom-6 right-6 z-50 hidden md:block">
                <AnimatePresence>
                    {showTooltip && !isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className="absolute bottom-full right-0 mb-3 w-64"
                        >
                            <div className="bg-elevation border border-border-subtle rounded-xl p-4 shadow-lg">
                                <p className="text-text-primary text-sm font-medium mb-1">Precisa de ajuda?</p>
                                <p className="text-text-secondary text-xs">Resposta em até 30 minutos.</p>
                                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-elevation border-r border-b border-border-subtle transform rotate-45" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            className="absolute bottom-20 right-0 w-80 bg-elevation border border-border-subtle rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="bg-gold/10 border-b border-gold/20 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                        <WhatsAppIcon className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-text-primary font-semibold text-sm">Bforense</p>
                                        <p className="text-green-400 text-xs flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            Online agora
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="bg-surface rounded-xl p-3 mb-4">
                                    <p className="text-text-secondary text-sm">
                                        Olá! Precisa de uma investigação? Resposta em até 30 minutos.
                                    </p>
                                </div>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-gold hover:bg-gold/90 text-bg font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    Solicitar Orçamento
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => isExpanded ? setIsExpanded(false) : handleWhatsAppClick()}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    className="whatsapp-btn relative flex items-center justify-center w-14 h-14 bg-gold hover:bg-gold/90 rounded-full shadow-[0_4px_20px_rgba(192,57,43,0.3)] hover:shadow-[0_8px_30px_rgba(192,57,43,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
                    aria-label="Falar pelo WhatsApp"
                >
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-6 h-6 text-bg" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="message"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <WhatsAppIcon className="w-6 h-6 text-bg" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" style={{ animationDuration: "2s" }} />
                </button>
            </div>

        </>
    );
}
