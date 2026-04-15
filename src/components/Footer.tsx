import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

const PHONE = "551131641004";
const EMAIL = "bforense@pm.me";

const NAV_LINKS = [
    { label: "Serviços", href: "/servicos" },
    { label: "Como funciona", href: "/como-funciona" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
];

export function Footer() {
    return (
        <footer className="bg-surface-elevated border-t border-[rgba(255,255,255,0.06)]">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    {/* Logo & Info */}
                    <div className="md:col-span-1">
                        <img
                            src="/logo-new.webp"
                            alt="Bforense"
                            className="h-10 w-auto opacity-90 mb-4"
                        />
                        <p className="text-text-muted text-sm leading-relaxed">
                            Agência de investigações privada com atuação nacional.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-text-primary text-sm font-semibold mb-4">Navegação</h4>
                        <nav className="flex flex-col gap-2">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-text-primary text-sm font-semibold mb-4">Contato</h4>
                        <div className="flex flex-col gap-2 text-sm">
                            <a
                                href={`https://wa.me/${PHONE}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-secondary hover:text-text-primary transition-colors"
                            >
                                WhatsApp: (11) 3164-1004
                            </a>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="text-text-secondary hover:text-text-primary transition-colors"
                            >
                                {EMAIL}
                            </a>
                        </div>
                    </div>

                    {/* CTA */}
                    <div>
                        <h4 className="text-text-primary text-sm font-semibold mb-4">Fale Conosco</h4>
                        <p className="text-text-muted text-sm mb-4">
                            Atendimento sigiloso 24 horas.
                        </p>
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gold hover:text-[#D44637] text-sm font-medium transition-colors"
                        >
                            <WhatsAppIcon className="w-4 h-4" />
                            Iniciar conversa
                            <ArrowRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-xs text-text-muted">
                            © 2026 Bforense Investigações. Todos os direitos reservados.
                        </p>
                        <p className="text-[11px] leading-relaxed text-text-legal max-w-xl md:text-right">
                            A Bforense é uma agência de investigações privada, operando sob a Lei Federal 13.432/2017. 
                            Não realizamos interceptações telefônicas, quebra de sigilo bancário sem ordem judicial, 
                            bloqueios de contas ou prisões.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
