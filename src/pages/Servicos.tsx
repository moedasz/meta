import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { SERVICES } from "../data/services";

const PHONE = "551131641004";

export function Servicos() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient px-6 sm:px-8 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="section-label">Serviços</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Serviços de investigação e inteligência
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Cada caso define a operação. Nós definimos o resultado.
                    </motion.p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="px-6 sm:px-8 pb-20 sm:pb-28 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-8">
                        {SERVICES.map((service, i) => {
                            const Icon = service.icon;
                            return (
                                <motion.div
                                    key={service.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                                >
                                    <Link
                                        to={`/servicos/${service.slug}`}
                                        className="service-card p-6 sm:p-8 rounded-xl group block h-full"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface border border-border-subtle flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-text-secondary card-icon" strokeWidth={1.5} />
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="font-heading text-lg sm:text-xl text-text-primary mb-2 group-hover:text-gold transition-colors">
                                                    {service.title}
                                                </h2>
                                                <p className="text-text-secondary text-sm leading-relaxed">
                                                    {service.shortDesc}
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="ml-16 mb-4 flex flex-col gap-1.5">
                                            {service.bullets.slice(0, 3).map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="text-text-secondary text-sm flex items-start gap-2"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="ml-16 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-2 text-gold font-medium text-sm">
                                                Saiba mais
                                                <ArrowRight className="w-4 h-4 card-arrow" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 sm:px-8 py-16 sm:py-20 bg-surface-alt">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Não encontrou o que precisa?
                        </h2>
                        <p className="text-text-secondary mb-8">
                            Cada caso é único. Fale conosco e descreva sua situação. Avaliamos e propomos a melhor abordagem.
                        </p>
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar sobre um caso específico.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-base"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Fale com um especialista
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
