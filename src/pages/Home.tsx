import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
    MessageCircle,
    ArrowRight,
    Check,
    Star,
    ChevronDown,
    Shield,
    Clock,
    MapPin,
    Search,
    Briefcase,
    Laptop,
    Scale,
    Users,
    BadgeCheck,
    FileText,
    Zap,
    FileCheck,
    PhoneCall,
    ShieldCheck,
} from "lucide-react";
import { NetworkBackground } from "../components/NetworkBackground";

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    );
}

const PHONE = "551131641004";

function waLink(message: string) {
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

function trackWhatsAppClick(label: string) {
    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "whatsapp_click", {
            event_category: "conversion",
            event_label: label,
        });
    }
    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Contact", { content_name: label });
    }
}

const SERVICES = [
    {
        icon: Search,
        title: "Localização de Pessoas",
        desc: "Encontramos pessoas desaparecidas, devedores, pais biológicos, golpistas e indivíduos que não desejam ser encontrados.",
        features: ["Rastreamento avançado", "Localização de golpistas", "Busca de familiares"],
        waMessage: "Olá! Gostaria de um orçamento para Localização de Pessoas.",
    },
    {
        icon: Briefcase,
        title: "Investigação Empresarial",
        desc: "Proteja sua empresa contra fraudes, corrupção, desvios e práticas antiéticas de funcionários ou sócios.",
        features: ["Combate a fraudes", "Verificação de sócios", "Due diligence"],
        waMessage: "Olá! Gostaria de um orçamento para Investigação Empresarial.",
    },
    {
        icon: ShieldCheck,
        title: "Inteligência e Contrainteligência",
        desc: "Operações de inteligência estratégica e proteção contra ameaças internas e externas para empresas e indivíduos.",
        features: ["Análise de ameaças", "Proteção de informações", "Segurança corporativa"],
        waMessage: "Olá! Gostaria de um orçamento para Inteligência e Contrainteligência.",
    },
    {
        icon: Scale,
        title: "Investigação Trabalhista",
        desc: "Comprove fraudes em auxílio-doença, acidentes de trabalho falsos e funcionários que trabalham durante afastamento.",
        features: ["Flagrantes de fraude", "Documentação legal", "Provas para RH"],
        waMessage: "Olá! Gostaria de um orçamento para Investigação Trabalhista.",
    },
    {
        icon: Laptop,
        title: "Ethical Hacking",
        desc: "Testes de invasão autorizados para identificar vulnerabilidades em sistemas, redes e aplicações antes que atacantes o façam.",
        features: ["Pentest de aplicações", "Testes de rede", "Relatório de correções"],
        waMessage: "Olá! Gostaria de um orçamento para Ethical Hacking.",
    },
    {
        icon: Users,
        title: "Monitoramento Digital",
        desc: "Vigilância contínua de ameaças digitais, vazamentos de dados na dark web e menções à sua marca.",
        features: ["Dark web monitoring", "Detecção de vazamentos", "Alertas em tempo real"],
        waMessage: "Olá! Gostaria de um orçamento para Monitoramento Digital.",
    },
    {
        icon: FileText,
        title: "Investigação Digital",
        desc: "Análise de pegada digital, redes sociais, domínios e rastros online para casos pessoais e empresariais.",
        features: ["Perfis ocultos", "Redes sociais", "Rastreamento digital"],
        waMessage: "Olá! Gostaria de um orçamento para Investigação Digital.",
    },
    {
        icon: BadgeCheck,
        title: "Provas para Advogados",
        desc: "Coleta profissional de provas e evidências válidas para fortalecer processos judiciais.",
        features: ["Provas válidas", "Relatórios técnicos", "Suporte em audiências"],
        waMessage: "Olá! Gostaria de um orçamento para Provas para Advogados.",
    },
];

const METRICS = [
    { value: 255, suffix: "+", label: "Casos Resolvidos" },
    { value: 10, suffix: "+", label: "Anos de Experiência" },
    { value: 100, suffix: "%", label: "Sigilo Garantido" },
    { value: 12, suffix: "+", label: "Estados Atendidos" },
];

const TESTIMONIALS = [
    {
        text: "Meu marido saía todo fim de semana com desculpa de plantão. Em 6 dias a Bforense me entregou fotos, horários e endereços. Levei tudo pro advogado e consegui a guarda dos meus filhos sem perder nada no divórcio.",
        name: "Fernanda R.",
        location: "Campinas, SP",
        type: "Investigação Conjugal",
        avatar: "https://randomuser.me/api/portraits/thumb/women/44.jpg",
    },
    {
        text: "Tomei um golpe de R$47 mil em um investimento falso. A polícia não conseguia localizar o golpista. A Bforense rastreou ele em 11 dias, identificou contas bancárias e eu consegui recuperar quase tudo judicialmente.",
        name: "Marcos V.",
        location: "Florianópolis, SC",
        type: "Localização de Golpistas",
        avatar: "https://randomuser.me/api/portraits/thumb/men/32.jpg",
    },
    {
        text: "Suspeitava que meu sócio estava desviando dinheiro da empresa, mas não tinha como provar. O relatório da Bforense mostrou movimentações, notas frias e até uma empresa fantasma no nome da esposa dele. Ele foi afastado e processado.",
        name: "Ricardo T.",
        location: "São Paulo, SP",
        type: "Investigação Empresarial",
        avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    {
        text: "Pago pensão alimentícia há 4 anos. Descobri que minha ex estava morando com outro homem e trabalhando sem declarar. A Bforense levantou tudo, com provas válidas. Meu advogado entrou com a exoneração e foi aceita.",
        name: "Anderson L.",
        location: "Goiânia, GO",
        type: "Exoneração de Pensão",
        avatar: "https://randomuser.me/api/portraits/thumb/men/22.jpg",
    },
    {
        text: "Um funcionário nosso estava de atestado há 8 meses por problema na coluna. A Bforense flagrou ele fazendo frete de mudança no fim de semana. Com as provas, conseguimos a justa causa e revertemos o processo que ele tinha aberto contra nós.",
        name: "Patrícia M.",
        location: "Belo Horizonte, MG",
        type: "Investigação Trabalhista",
        avatar: "https://randomuser.me/api/portraits/thumb/women/68.jpg",
    },
    {
        text: "Minha filha sumiu depois de uma briga em casa, tinha 19 anos. Fiz B.O., mas a polícia não priorizou porque ela era maior de idade. A Bforense localizou ela em 9 dias vivendo em outra cidade. Pude pelo menos saber que estava bem.",
        name: "Dona Cláudia S.",
        location: "Recife, PE",
        type: "Localização de Pessoas",
        avatar: "https://randomuser.me/api/portraits/thumb/women/52.jpg",
    },
    {
        text: "Encontrei perfis falsos do meu namorado em sites de relacionamento usando nome diferente. A Bforense rastreou os perfis, cruzou com dados reais e descobriu que ele mantinha outra família em Guarulhos. Doeu, mas precisava saber.",
        name: "Juliana A.",
        location: "Santo André, SP",
        type: "Investigação Virtual",
        avatar: "https://randomuser.me/api/portraits/thumb/women/33.jpg",
    },
    {
        text: "Sou advogada e precisava de provas para um caso de alienação parental. A Bforense fez um trabalho técnico impecável. O relatório foi aceito como prova documental e mudou completamente o rumo do processo. Indico para todos os meus clientes.",
        name: "Dra. Camila F.",
        location: "Curitiba, PR",
        type: "Provas para Advogados",
        avatar: "https://randomuser.me/api/portraits/thumb/women/17.jpg",
    },
    {
        text: "Caí no golpe do Pix, transferi R$12 mil para um carro que não existia. A Bforense identificou o dono real da conta, o endereço e até outros anúncios falsos dele. Passei tudo pro delegado e o cara foi preso em 3 semanas.",
        name: "Thiago B.",
        location: "Brasília, DF",
        type: "Localização de Golpistas",
        avatar: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
    },
    {
        text: "Desconfiava da minha esposa há meses mas ficava me sentindo culpado. Liguei na Bforense sem saber o que esperar. Foram muito humanos comigo, sem julgamento nenhum. Em 12 dias tive a resposta que precisava. Infelizmente confirmou, mas pelo menos pude tomar uma decisão com clareza.",
        name: "Eduardo P.",
        location: "Porto Alegre, RS",
        type: "Investigação Conjugal",
        avatar: "https://randomuser.me/api/portraits/thumb/men/67.jpg",
    },
];

const FAQ_ITEMS = [
    {
        question: "Qual o preço de um Detetive Particular?",
        answer: "O investimento varia conforme a complexidade do caso, tempo de investigação e recursos necessários. Após uma conversa inicial, apresentamos um orçamento detalhado e transparente. Valores podem ir de R$ 2.000 a R$10.000 para investigações completas. Mas também oferecemos levantamentos de dados simples a partir de R$ 89. Aceitamos PIX, transferência e cartão em até 12x.",
    },
    {
        question: "É lícito contratar um Detetive Particular?",
        answer: "Sim. A profissão de detetive particular é regulamentada pela Lei Federal 13.432/2017. Todos os nossos métodos operam dentro da legalidade e os relatórios são aceitos como prova em processos judiciais, arbitragens e procedimentos administrativos.",
    },
    {
        question: "Quanto tempo demora uma investigação conjugal?",
        answer: "Em média, investigações conjugais levam de 5 a 15 dias para obter provas conclusivas. Casos mais complexos podem levar até 30 dias. Mantemos você informado sobre o andamento durante todo o processo.",
    },
    {
        question: "As provas coletadas valem na justiça?",
        answer: "Sim. Todos os nossos relatórios são elaborados com rigor documental e metodologia que atende aos requisitos para utilização como prova em processos judiciais. Trabalhamos em conjunto com seu advogado quando necessário.",
    },
    {
        question: "Como funciona o sigilo das informações?",
        answer: "Toda comunicação é feita por canais seguros e criptografados. Não armazenamos dados além do necessário para a operação. Relatórios são entregues em formato seguro e deletados de nossos servidores após a entrega.",
    },
    {
        question: "Vocês atendem em qual região?",
        answer: "Temos sede em São Paulo e Porto Alegre mas atuamos em todo o território nacional. Já conduzimos operações em mais de 12 estados brasileiros, incluindo todas as capitais.",
    },
    {
        question: "É possível clonar o WhatsApp do meu parceiro?",
        answer: "NÃO. Clonagem de WhatsApp sem acesso físico ao aparelho é GOLPE. Não oferecemos esse serviço pois é ilegal. Desconfie de qualquer empresa que prometa isso. Trabalhamos apenas com métodos legais e éticos.",
    },
    {
        question: "Como solicito um orçamento?",
        answer: "Basta clicar no botão de WhatsApp e enviar uma mensagem. Um de nossos especialistas responderá em até 30 minutos durante o horário comercial. A conversa é totalmente sigilosa.",
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

// FAQ Accordion Item with CTA link
function FAQItem({ item, isOpen, onClick }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onClick: () => void }) {
    return (
        <div className="border border-border-subtle rounded-xl mb-3 overflow-hidden bg-elevation hover:border-gold/30 transition-colors">
            <button
                onClick={onClick}
                className="w-full p-5 flex items-center justify-between text-left group"
            >
                <span className="font-medium text-text-primary group-hover:text-gold transition-colors pr-4">
                    {item.question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-5 px-5" : "max-h-0"}`}
            >
                <p className="text-text-secondary leading-relaxed mb-3">
                    {item.answer}
                </p>
                <a
                    href={waLink("Olá! Tenho uma dúvida sobre: " + item.question)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold hover:text-[#D44637] text-sm font-medium transition-colors"
                >
                    Ainda tem dúvidas? Fale com um especialista
                    <ArrowRight className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}

// FAQ Section
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="section-label">Dúvidas Frequentes</span>
                    <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                        Perguntas <span className="text-gold-accent">Frequentes</span>
                    </h2>
                    <p className="text-text-secondary mt-4">
                        Tire suas dúvidas sobre nossos serviços de investigação particular.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem
                            key={i}
                            item={item}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// Animated counter
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value]);

    return (
        <span ref={ref} className="counter-value">
            {count}{suffix}
        </span>
    );
}

// Service Card with WhatsApp CTA
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="service-card p-6 rounded-xl group h-full flex flex-col"
        >
            <div className="icon-container-gold mb-5" style={{ width: 48, height: 48, borderRadius: 12 }}>
                <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg text-[#ECE0E0] mb-2">{service.title}</h3>
            <p className="text-[#B8A8A8] text-sm leading-relaxed mb-4 flex-1">{service.desc}</p>
            <ul className="space-y-2.5 mb-5">
                {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#B8A8A8]">
                        <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
            <a
                href={waLink(service.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-[rgba(192,57,43,0.1)] hover:bg-[rgba(192,57,43,0.2)] border border-[rgba(192,57,43,0.2)] hover:border-[rgba(192,57,43,0.4)] text-gold font-medium text-sm py-3 px-4 rounded-lg transition-all group/btn"
            >
                <WhatsAppIcon className="w-4 h-4" />
                Solicitar Orçamento
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
        </motion.div>
    );
}

// Testimonial Card - refined design
function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative bg-elevation border border-border-subtle rounded-2xl p-7 sm:p-8 hover:border-[rgba(192,57,43,0.35)] transition-all duration-400 flex flex-col group"
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
        >
            {/* Quote mark decorative */}
            <span className="absolute top-4 right-6 text-[4rem] leading-none font-serif text-[rgba(192,57,43,0.08)] select-none pointer-events-none">"</span>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
            </div>

            {/* Quote */}
            <p className="text-[#ECE0E0] text-[0.95rem] sm:text-base leading-[1.7] flex-1 mb-6">
                "{testimonial.text}"
            </p>

            {/* Author + badge */}
            <div className="flex items-center justify-between pt-5 border-t border-[rgba(74,42,42,0.4)]">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full border border-[rgba(192,57,43,0.2)] overflow-hidden flex-shrink-0" style={{ marginTop: "-3px" }}>
                        <img
                            src={testimonial.avatar}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                            style={{ filter: "blur(3px) brightness(0.8)", transform: "scale(1.15)" }}
                        />
                    </div>
                    <div>
                        <p className="text-[#ECE0E0] text-sm font-semibold">{testimonial.name}</p>
                        <p className="text-[#8A7A7A] text-xs">{testimonial.location}</p>
                    </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1.5 bg-[rgba(192,57,43,0.08)] border border-[rgba(192,57,43,0.15)] rounded-lg text-gold text-xs font-medium">
                    {testimonial.type}
                </span>
            </div>
        </motion.div>
    );
}

export function Home() {
    return (
        <div className="pt-16 sm:pt-18">
            {/* ==================== HERO ==================== */}
            <section className="hero-section relative min-h-screen overflow-hidden">
                <div className="absolute inset-0 hero-gradient" />
                <NetworkBackground />
                <div className="absolute inset-0 hero-grid-overlay pointer-events-none" aria-hidden="true" />
                <div className="hero-mobile-bg md:hidden" aria-hidden="true" />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.15 }}
                    className="hero-desktop-image hidden md:block"
                    aria-hidden="true"
                >
                    <img
                        src="/hero-desktop.webp"
                        alt=""
                        className="hero-desktop-img"
                        loading="eager"
                        decoding="async"
                    />
                    <div className="hero-img-fade-left" />
                    <div className="hero-img-fade-bottom" />
                    <div className="hero-img-fade-top" />
                </motion.div>

                <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 min-h-screen flex flex-col justify-start pt-24 md:justify-center md:pt-0 pb-0 md:pb-0">
                    <div className="md:max-w-[60%] lg:max-w-[58%]">
                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-heading text-[clamp(1.625rem,4.7vw,2.925rem)] leading-[1.15] mb-6 tracking-tight"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            <span className="text-white whitespace-nowrap">Descubra a Verdade</span>
                            <br />
                            <span className="text-white whitespace-nowrap">que Você Precisa</span>
                            <br />
  <span className="text-white">Descobrir </span>
  <span className="text-gold-accent whitespace-nowrap">e Vença <span className="inline-block" style={{ transform: "scaleX(-1)" }}>🦅</span></span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-[#B8A8A8] text-base lg:text-lg max-w-lg mb-6"
                            style={{ lineHeight: 1.75 }}
                        >
                            Investigação particular profissional. Resolva suas dúvidas com quem já solucionou mais de 255 casos em todo o Brasil. Solicite um orçamento agora.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4"
                        >
                            <a
                                href={waLink("Olá! Gostaria de um orçamento para avaliar meu caso.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick("hero_cta")}
                                className="btn-primary text-base group"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
Solicitar Orçamento
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>

                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000000] to-transparent z-20 pointer-events-none" />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
                >
                    <span className="text-[#8A7A7A] text-[0.65rem] uppercase tracking-[0.2em] font-medium">Saiba mais</span>
                    <div className="w-[22px] h-[36px] rounded-full border-2 border-[rgba(192,57,43,0.4)] flex items-start justify-center p-1.5">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                            className="w-[4px] h-[4px] rounded-full bg-gold"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ==================== METRICS ==================== */}
            <section className="metrics-section metrics-grid-pattern px-6 sm:px-8 py-16 sm:py-20 bg-elevation">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
                        {METRICS.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="text-center relative"
                            >
                                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                                <p className="counter-label">{metric.label}</p>
                                {i < METRICS.length - 1 && <div className="metrics-divider" />}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider-glow" />

            {/* ==================== COMO FUNCIONA ==================== */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-14">
                        <span className="section-label">De Suspeita a Certeza Sem Complicação</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Como Funciona em <span className="text-gold-accent">3 Passos</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            {
                                icon: WhatsAppIcon,
                                step: "01",
                                title: "Fale Agora",
                                desc: "Um especialista responde você no WhatsApp em minutos. Sem formulário, sem julgamento, 100% sigiloso.",
                            },
                            {
                                icon: FileCheck,
                                step: "02",
                                title: "Proposta em Até 10 Minutos",
                                desc: "Avaliamos seu caso na hora e enviamos um orçamento claro, justo e sem letra miúda.",
                            },
                            {
                                icon: Zap,
                                step: "03",
                                title: "Provas na Sua Mão em 4 Horas Até 7 Dias",
                                desc: "Relatório técnico completo. Válido na justiça e onde mais você quiser usar. Isso, é contigo.",
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="text-center p-6 bg-elevation rounded-2xl border border-border-subtle relative"
                            >
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-bg text-xs font-bold px-3 py-1 rounded-full">
                                    PASSO {step.step}
                                </div>
                                <div className="icon-container-gold mx-auto mb-4 mt-2" style={{ width: 56, height: 56, borderRadius: 16 }}>
                                    <step.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                                </div>
                                <h3 className="font-semibold text-lg text-text-primary mb-2">{step.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeIn} className="text-center mt-10">
                        <a
                            href={waLink("Olá! Gostaria de um orçamento para avaliar meu caso.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-base group inline-flex"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Comece Agora
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            <div className="section-divider-glow" />

            {/* ==================== SERVICES ==================== */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 relative overflow-hidden" style={{ background: "#0F0A0A" }}>
                {/* Video background */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.35 }}
                    >
                        <source src="/services-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A0A] via-transparent to-[#0F0A0A]" style={{ opacity: 0.8 }} />
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-6">
                        <span className="section-label">Nossos Serviços</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Investigações Profissionais para <span className="text-gold-accent">Cada Situação</span>
                        </h2>
                        <p className="text-text-secondary mt-4 max-w-2xl mx-auto">
                            Oferecemos soluções completas com sigilo absoluto e provas válidas em juízo para serem usadas como você bem entender. Cada caso é único, e tratamos assim.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                        {SERVICES.map((service, i) => (
                            <ServiceCard key={service.title} service={service} index={i} />
                        ))}
                    </div>
                    <motion.div {...fadeIn} className="text-center mt-12">
                        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 bg-elevation rounded-xl border border-border-subtle">
                            <p className="text-text-secondary text-sm">Não encontrou o que procura? Atendemos <span className="text-text-primary font-medium">diversos tipos de investigação</span>.</p>
                            <a
                                href={waLink("Olá! Gostaria de consultar um especialista sobre meu caso.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-bg font-semibold text-sm py-2.5 px-5 rounded-lg transition-colors"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                Consultar Especialista
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="section-divider-glow" />

            {/* ==================== TESTIMONIALS ==================== */}
            <section className="px-6 sm:px-8 py-20 sm:py-28 bg-surface-alt relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(192,57,43,0.04),transparent_70%)] pointer-events-none" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div {...fadeIn} className="text-center mb-14">
                        <span className="section-label">Mais de 255 Casos Resolvidos</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Histórias Reais de Quem <span className="text-gold-accent">Agiu a Tempo.</span>
                        </h2>
                        <p className="text-[#B8A8A8] mt-4 max-w-xl mx-auto text-sm sm:text-base">
                            Cada caso abaixo é de um cliente real. Nomes alterados por sigilo.
                        </p>
                    </motion.div>

                    {/* Testimonials grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {TESTIMONIALS.map((testimonial, i) => (
                            <TestimonialCard key={i} testimonial={testimonial} index={i} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        {...fadeIn}
                        className="mt-12 text-center"
                    >
                        <p className="text-[#8A7A7A] text-xs mb-6">
                            * Nomes alterados para preservar a identidade dos clientes.
                        </p>
                        <a
                            href={waLink("Olá! Vi os depoimentos no site e gostaria de um orçamento para meu caso.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("testimonials_cta")}
                            className="btn-primary text-base group inline-flex"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Quero Resolver Meu Caso
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            <div className="section-divider-glow" />

            {/* ==================== FAQ ==================== */}
            <FAQSection />

            <div className="section-divider-glow" />

            {/* ==================== FINAL CTA ==================== */}
            <section className="px-6 sm:px-8 py-24 sm:py-32 relative overflow-hidden" style={{ background: "#0F0A0A" }}>
                {/* Video background */}
                <div className="absolute inset-0 z-0" aria-hidden="true">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.5 }}
                    >
                        <source src="/cta-bg.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0A0A] via-transparent to-[#0F0A0A]" style={{ opacity: 0.7 }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F0A0A] via-transparent to-[#0F0A0A]" style={{ opacity: 0.5 }} />
                </div>
                <div className="glow-orb glow-orb-lg animate-pulse-glow" style={{ top: "30%", left: "10%" }} aria-hidden="true" />
                <div className="glow-orb glow-orb-sm animate-float-slow" style={{ bottom: "20%", right: "15%" }} aria-hidden="true" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <motion.div {...fadeIn}>
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-text-primary mb-4">
                            Cada Dia Sem Agir é uma Prova que <span className="text-gold-accent">Pode Ser Perdida.</span>
                        </h2>
                        <p className="text-text-secondary mb-4 max-w-xl mx-auto">
                            Converse com um especialista agora e resolva seu caso com sigilo e profissionalismo.
                        </p>

                        {/* Urgency */}
                        <p className="text-red-400/80 text-sm font-medium mb-8">
                            Vagas limitadas: aceitando apenas 5 novos casos esta semana
                        </p>

                        <a
                            href={waLink("Olá! Gostaria de um orçamento para avaliar meu caso.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick("final_cta")}
                            className="w-full sm:w-auto btn-primary text-sm sm:text-base inline-flex"
                        >
                            <WhatsAppIcon className="w-5 h-5 hidden sm:block" />
                            <span className="hidden sm:inline">Solicitar Orçamento pelo WhatsApp</span>
                            <span className="sm:hidden">Orçamento pelo WhatsApp</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>

                        <p className="text-text-muted text-xs sm:text-sm mt-4 sm:mt-6">
                            Atendemos em todo o Brasil · (11) 3164-1004
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
