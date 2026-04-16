import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const PHONE = "551131641004";
const EMAIL = "bforense@pm.me";

const OPTIONS = [
    "Preciso verificar informações sobre uma pessoa",
    "Preciso proteger meu patrimônio ou empresa",
    "Estou em uma disputa judicial ou societária",
    "Preciso de um levantamento antes de uma decisão importante",
    "Prefiro não dizer agora",
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

export function Contato() {
    const [form, setForm] = useState({
        nome: "",
        whatsapp: "",
        assunto: "",
    });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome || !form.whatsapp || !form.assunto) return;
        
        setLoading(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setSent(true);
    };

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
                        <span className="section-label">Contato</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Fale conosco
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Sigilo absoluto desde o primeiro contato. Escolha como prefere falar.
                    </motion.p>
                </div>
            </section>

            {/* Contact Options */}
            <section className="px-6 sm:px-8 pb-10 sm:pb-16 bg-surface">
                <div className="max-w-4xl mx-auto -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* WhatsApp */}
                        <motion.div
                            {...fadeIn}
                            className="service-card p-8 rounded-xl group"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                                    <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
                                </div>
                                <h2 className="font-heading text-xl text-text-primary">WhatsApp</h2>
                            </div>
                            <p className="text-text-secondary text-sm mb-6" style={{ lineHeight: 1.7 }}>
                                Resposta em até 2 horas em horário comercial. Atendimento sigiloso 24h.
                            </p>
                            <a
                                href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-[#1faf55] transition-all hover:-translate-y-0.5"
                            >
                                Abrir conversa no WhatsApp
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.1 }}
                            className="service-card p-8 rounded-xl group"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <Mail className="w-7 h-7 text-gold" strokeWidth={1.5} />
                                </div>
                                <h2 className="font-heading text-xl text-text-primary">Email criptografado</h2>
                            </div>
                            <p className="text-text-secondary text-sm mb-6" style={{ lineHeight: 1.7 }}>
                                Para casos que exigem documentação inicial por escrito. ProtonMail.
                            </p>
                            <a
                                href={`mailto:${EMAIL}`}
                                className="btn-primary w-full text-sm justify-center"
                            >
                                {EMAIL}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="px-6 sm:px-8 pb-20 sm:pb-28 bg-surface">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        {...fadeIn}
                        className="process-card"
                    >
                        <div className="text-center mb-8">
                            <span className="section-label">Formulário</span>
                            <h2 className="font-heading text-xl text-text-primary">
                                Ou envie uma mensagem
                            </h2>
                        </div>

                        {sent ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                                    <WhatsAppIcon className="w-8 h-8 text-[#25D366]" />
                                </div>
                                <h3 className="font-semibold text-text-primary text-lg mb-2">
                                    Mensagem enviada
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    Entraremos em contato pelo WhatsApp informado de forma discreta.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        Nome (primeiro nome)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.nome}
                                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                                        className="w-full input-premium"
                                        placeholder="Seu nome"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.whatsapp}
                                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                                        className="w-full input-premium"
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-text-secondary text-sm mb-2">
                                        Como podemos ajudar?
                                    </label>
                                    <select
                                        value={form.assunto}
                                        onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                                        className="w-full input-premium appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione uma opção
                                        </option>
                                        {OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Enviar mensagem
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        <p className="text-text-muted text-xs text-center mt-8">
                            Seus dados são tratados com sigilo absoluto. O contato será feito exclusivamente 
                            pelo WhatsApp informado, de forma discreta.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
