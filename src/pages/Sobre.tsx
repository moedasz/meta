import { motion } from "framer-motion";
import { Scale, Users, MapPin, Shield, Briefcase, Building2, User, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";

const PHONE = "551131641004";

const DIFFERENTIALS = [
    {
        icon: Scale,
        title: "Metodologia legal",
        desc: "Tudo dentro da lei. Relatórios produzidos para ter validade jurídica.",
    },
    {
        icon: Users,
        title: "Equipe multidisciplinar",
        desc: "Investigadores, analistas de inteligência, especialistas em forense digital, pentesters e analistas de segurança.",
    },
    {
        icon: MapPin,
        title: "Atuação nacional",
        desc: "Sede em Porto Alegre, operações em todo o Brasil.",
    },
];

const TIMELINE = [
    {
        year: "2018",
        title: "Fundação",
        desc: "Início das operações em Porto Alegre, com foco em investigação patrimonial.",
    },
    {
        year: "2020",
        title: "Expansão digital",
        desc: "Incorporação de especialistas em forense digital e inteligência de fontes abertas.",
    },
    {
        year: "2022",
        title: "Cobertura nacional",
        desc: "Abertura de rede de operadores em 12 estados brasileiros.",
    },
    {
        year: "2024",
        title: "Segurança digital",
        desc: "Expansão para ethical hacking, monitoramento digital e serviços de cibersegurança.",
    },
];

const FOR_WHO = [
    {
        icon: User,
        title: "Pessoas físicas",
        desc: "Casos pessoais, familiares e patrimoniais que exigem discrição absoluta.",
    },
    {
        icon: Building2,
        title: "Empresas",
        desc: "Due diligence, investigação de fraudes, compliance e suporte a decisões estratégicas.",
    },
    {
        icon: Briefcase,
        title: "Escritórios de advocacia",
        desc: "Produção de provas, inteligência para litígios e suporte a teses jurídicas.",
    },
    {
        icon: Users,
        title: "Famílias",
        desc: "Casos de guarda, localização de pessoas e questões patrimoniais familiares.",
    },
];

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" },
};

export function Sobre() {
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
                        <span className="section-label">Sobre</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-6 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Quem somos
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* About Text */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        {...fadeIn}
                        className="flex flex-col gap-6 text-text-secondary text-base sm:text-lg leading-relaxed"
                        style={{ lineHeight: 1.8 }}
                    >
                        <p>
                            A Bforense é uma agência especializada em investigação, inteligência e segurança digital. 
                            Atuamos em todo o território nacional, atendendo pessoas físicas, empresas e escritórios 
                            de advocacia com serviços que vão desde investigação patrimonial até ethical hacking e 
                            monitoramento de ameaças digitais.
                        </p>
                        <p>
                            Nossa equipe combina experiência em investigação forense digital, análise de fontes 
                            abertas, inteligência humana e segurança cibernética. Trabalhamos com metodologia legal, 
                            sob a Lei Federal 13.432/2017, e produzimos material aceito como prova em processos 
                            judiciais e arbitragens.
                        </p>
                        <p>
                            Operamos com sigilo absoluto. Não divulgamos identidade de clientes, não publicamos 
                            cases com nomes reais e não mantemos registros além do necessário para a operação.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Timeline - Nossa história */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Trajetória</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Nossa história
                        </h2>
                    </motion.div>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border-subtle hidden sm:block" />
                        
                        <div className="space-y-12">
                            {TIMELINE.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                                        i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                                >
                                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                        <div className="process-card p-6">
                                            <span className="text-gold font-semibold text-sm mb-2 block">
                                                {item.year}
                                            </span>
                                            <h3 className="font-heading text-lg text-text-primary mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Center dot */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-surface-alt" style={{ top: "24px" }} />
                                    <div className="flex-1" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Base Legal */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Regulamentação</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Base legal
                        </h2>
                    </motion.div>
                    <motion.div
                        {...fadeIn}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="process-card p-6 text-center">
                            <Shield className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
                            <h3 className="font-heading text-lg text-text-primary mb-2">
                                Lei 13.432/2017
                            </h3>
                            <p className="text-text-secondary text-sm">
                                Regulamenta a profissão de detetive particular no Brasil.
                            </p>
                        </div>
                        <div className="process-card p-6 text-center">
                            <Briefcase className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
                            <h3 className="font-heading text-lg text-text-primary mb-2">
                                CBO 3518-05
                            </h3>
                            <p className="text-text-secondary text-sm">
                                Classificação Brasileira de Ocupações para detetive particular.
                            </p>
                        </div>
                        <div className="process-card p-6 text-center">
                            <Building2 className="w-10 h-10 text-gold mx-auto mb-4" strokeWidth={1.5} />
                            <h3 className="font-heading text-lg text-text-primary mb-2">
                                CNAE 8030-7/00
                            </h3>
                            <p className="text-text-secondary text-sm">
                                Atividades de investigação particular.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Como trabalhamos */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Metodologia</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Como trabalhamos
                        </h2>
                    </motion.div>
                    <motion.div
                        {...fadeIn}
                        className="prose-custom max-w-3xl mx-auto space-y-6 text-text-secondary"
                        style={{ lineHeight: 1.8 }}
                    >
                        <p>
                            Toda nossa operação segue os limites estabelecidos pela Lei 13.432/2017. 
                            Não realizamos interceptações telefônicas, quebra de sigilo bancário, invasão de 
                            sistemas ou qualquer procedimento que exija ordem judicial.
                        </p>
                        <p>
                            Nosso trabalho se baseia em:
                        </p>
                        <ul className="space-y-3 ml-6">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Análise de registros públicos e fontes abertas (OSINT)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Monitoramento e documentação em espaços públicos</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Entrevistas com pessoas que aceitam colaborar voluntariamente</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Análise de documentos fornecidos pelo cliente</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Cruzamento de informações e inteligência de dados</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Testes de penetração autorizados (ethical hacking)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5 flex-shrink-0" />
                                <span>Monitoramento contínuo de ameaças digitais e dark web</span>
                            </li>
                        </ul>
                        <p>
                            O material produzido segue padrões de documentação que permitem sua utilização 
                            em processos judiciais, arbitragens e procedimentos administrativos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Para quem trabalhamos */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Clientes</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Para quem trabalhamos
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FOR_WHO.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="process-card text-center p-6"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                        <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-heading text-lg text-text-primary mb-2">{item.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Differentials */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeIn} className="text-center mb-12">
                        <span className="section-label">Diferenciais</span>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                            Por que escolher a Bforense
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DIFFERENTIALS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                                    className="process-card text-center p-6"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-surface-card border border-border-subtle mb-5">
                                        <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-heading text-xl text-text-primary mb-3">{item.title}</h3>
                                    <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-6 sm:px-8 py-16 sm:py-20 bg-surface">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeIn}>
                        <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-4">
                            Pronto para conversar?
                        </h2>
                        <p className="text-text-secondary mb-8">
                            Entre em contato de forma confidencial. Avaliamos seu caso sem compromisso.
                        </p>
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Gostaria de falar com um especialista.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary text-base"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Falar com especialista
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
