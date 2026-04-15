import { motion } from "framer-motion";
import { Map, Radar, FileText, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const PHONE = "551131641004";

const STEPS = [
    {
        num: "01",
        icon: WhatsAppIcon,
        title: "Contato confidencial",
        desc: "Você entra em contato pelo WhatsApp ou email. Um especialista ouve sua situação, avalia a viabilidade e explica como podemos ajudar. Tudo sob sigilo desde o primeiro segundo.",
    },
    {
        num: "02",
        icon: Map,
        title: "Planejamento da operação",
        desc: "Definimos o escopo: o que precisa ser descoberto, quais fontes serão consultadas, qual o prazo estimado e o investimento. Você aprova antes de qualquer ação.",
    },
    {
        num: "03",
        icon: Radar,
        title: "Execução e coleta",
        desc: "Nossa equipe executa a operação, cruzando registros públicos, fontes abertas, inteligência digital e, quando necessário, trabalho de campo. Você recebe atualizações durante o processo.",
    },
    {
        num: "04",
        icon: FileText,
        title: "Dossiê e entrega",
        desc: "Entregamos um relatório de inteligência completo: provas documentadas, análise dos achados, conclusões e recomendações. Material pronto para uso por advogados, contadores ou diretamente pelo cliente.",
    },
];

export function ComoFunciona() {
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
                        <span className="section-label">Processo</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Nosso processo
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Da primeira conversa à entrega do dossiê. Transparência em cada etapa.
                    </motion.p>
                </div>
            </section>

            {/* Steps as cards */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {STEPS.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="process-card"
                                >
                                    <span className="process-card-number">{step.num}</span>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface-card border border-border-subtle mb-4">
                                            <Icon className="w-5 h-5 text-gold" />
                                        </div>
                                        <h2 className="font-heading text-xl text-text-primary mb-3">
                                            {step.title}
                                        </h2>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-gradient px-6 sm:px-8 py-16 sm:py-20 grid-pattern">
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">Contato</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Pronto para começar?
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-text-secondary text-base sm:text-lg mb-8"
                    >
                        Inicie uma avaliação confidencial sem compromisso.
                    </motion.p>
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de iniciar uma avaliação confidencial.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-base"
                    >
                        <WhatsAppIcon className="w-5 h-5" />
                        Iniciar uma avaliação confidencial
                        <ArrowRight className="w-4 h-4" />
                    </motion.a>
                </div>
            </section>
        </div>
    );
}
