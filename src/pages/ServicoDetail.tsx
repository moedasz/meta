import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { getServiceBySlug, getRelatedServices } from "../data/services";
import { useEffect } from "react";

const PHONE = "551131641004";

const PROCESS_STEPS = [
    { title: "Contato confidencial", desc: "Você fala com um especialista. Tudo sob sigilo." },
    { title: "Avaliação do caso", desc: "Entendemos a situação e definimos o plano." },
    { title: "Execução", desc: "Nossa equipe coleta e analisa as informações." },
    { title: "Entrega", desc: "Relatório completo, pronto para uso." },
];

export function ServicoDetail() {
    const { slug } = useParams<{ slug: string }>();
    const service = slug ? getServiceBySlug(slug) : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return <Navigate to="/servicos" replace />;
    }

    const Icon = service.icon;
    const relatedServices = getRelatedServices(service.relatedSlugs);

    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient px-6 sm:px-8 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link
                            to="/servicos"
                            className="inline-flex items-center gap-2 text-text-secondary hover:text-gold text-sm mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para serviços
                        </Link>
                        <div className="flex items-start gap-5 mb-6">
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-surface border border-border-subtle flex items-center justify-center">
                                <Icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                            </div>
                            <div>
                                <span className="section-label">{service.title}</span>
                                <h1
                                    className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight text-gradient-headline"
                                    style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                                >
                                    {service.title}
                                </h1>
                            </div>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-3xl"
                        style={{ lineHeight: 1.8, fontWeight: 400 }}
                    >
                        {service.shortDesc}
                    </motion.p>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="text-text-secondary text-base sm:text-lg leading-relaxed" style={{ lineHeight: 1.8 }}>
                                    {service.fullDesc}
                                </p>
                            </motion.div>

                            {/* What we investigate */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-6">
                                    O que investigamos
                                </h2>
                                <ul className="space-y-4">
                                    {service.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-gold" strokeWidth={2} />
                                            </div>
                                            <span className="text-text-secondary">{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* How it works */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-6">
                                    Como funciona
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {PROCESS_STEPS.map((step, i) => (
                                        <div key={i} className="process-card p-5">
                                            <span className="text-gold font-semibold text-sm mb-2 block">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <h3 className="font-semibold text-text-primary mb-1">{step.title}</h3>
                                            <p className="text-text-secondary text-sm">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* For who */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-6">
                                    Para quem é este serviço
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {service.forWho.map((persona, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 rounded-full bg-surface-card border border-border-subtle text-text-secondary text-sm"
                                        >
                                            {persona}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="bg-surface-card border border-border-subtle rounded-xl p-8"
                            >
                                <h3 className="font-heading text-xl text-text-primary mb-3">
                                    Fale com um especialista sobre {service.title.toLowerCase()}
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Toda conversa é confidencial. Avaliamos seu caso sem compromisso.
                                </p>
                                <a
                                    href={`https://wa.me/${PHONE}?text=${encodeURIComponent(`Olá! Gostaria de falar sobre ${service.title}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary text-base"
                                >
                                    <WhatsAppIcon className="w-5 h-5" />
                                    Falar sobre esse serviço
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                {/* Related Services */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="bg-surface-card border border-border-subtle rounded-xl p-6"
                                >
                                    <h3 className="font-heading text-lg text-text-primary mb-4">
                                        Serviços relacionados
                                    </h3>
                                    <div className="space-y-3">
                                        {relatedServices.map((related) => {
                                            const RelatedIcon = related.icon;
                                            return (
                                                <Link
                                                    key={related.slug}
                                                    to={`/servicos/${related.slug}`}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors group"
                                                >
                                                    <RelatedIcon className="w-5 h-5 text-text-secondary group-hover:text-gold transition-colors" strokeWidth={1.5} />
                                                    <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm">
                                                        {related.title}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>

                                {/* Quick Contact */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="bg-surface-alt border border-border-subtle rounded-xl p-6"
                                >
                                    <h3 className="font-heading text-lg text-text-primary mb-2">
                                        Precisa de ajuda?
                                    </h3>
                                    <p className="text-text-secondary text-sm mb-4">
                                        Resposta em até 24h. Sigilo garantido.
                                    </p>
                                    <a
                                        href={`https://wa.me/${PHONE}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full btn-secondary text-sm justify-center"
                                    >
                                        <WhatsAppIcon className="w-4 h-4" />
                                        WhatsApp
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
