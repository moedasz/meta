import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "../components/WhatsAppIcon";
import { getBlogPostBySlug, formatDate, BLOG_POSTS } from "../data/blogPosts";
import { useEffect } from "react";

const PHONE = "551131641004";

export function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? getBlogPostBySlug(slug) : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    // Get related posts (exclude current)
    const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

    // Simple markdown-like parser for content
    const renderContent = (content: string) => {
        const lines = content.trim().split("\n");
        const elements: JSX.Element[] = [];
        let listItems: string[] = [];
        let inList = false;

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`list-${elements.length}`} className="space-y-2 my-6 ml-6">
                        {listItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-text-secondary">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                );
                listItems = [];
            }
            inList = false;
        };

        lines.forEach((line, i) => {
            const trimmed = line.trim();

            if (trimmed.startsWith("## ")) {
                flushList();
                elements.push(
                    <h2 key={i} className="font-heading text-xl sm:text-2xl text-text-primary mt-10 mb-4">
                        {trimmed.slice(3)}
                    </h2>
                );
            } else if (trimmed.startsWith("### ")) {
                flushList();
                elements.push(
                    <h3 key={i} className="font-heading text-lg sm:text-xl text-text-primary mt-8 mb-3">
                        {trimmed.slice(4)}
                    </h3>
                );
            } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                inList = true;
                listItems.push(trimmed.slice(2));
            } else if (trimmed.startsWith("> ")) {
                flushList();
                elements.push(
                    <blockquote key={i} className="border-l-2 border-gold pl-4 my-6 italic text-text-secondary">
                        {trimmed.slice(2)}
                    </blockquote>
                );
            } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                flushList();
                elements.push(
                    <p key={i} className="font-semibold text-text-primary my-4">
                        {trimmed.slice(2, -2)}
                    </p>
                );
            } else if (trimmed === "---") {
                flushList();
                elements.push(<hr key={i} className="border-border-subtle my-8" />);
            } else if (trimmed === "") {
                flushList();
            } else {
                flushList();
                // Handle inline bold
                const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary">$1</strong>');
                elements.push(
                    <p
                        key={i}
                        className="text-text-secondary leading-relaxed my-4"
                        dangerouslySetInnerHTML={{ __html: withBold }}
                    />
                );
            }
        });

        flushList();
        return elements;
    };

    return (
        <div className="pt-16 sm:pt-18">
            {/* Hero */}
            <section className="hero-gradient px-6 sm:px-8 py-16 sm:py-24">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-text-secondary hover:text-gold text-sm mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Voltar para o blog
                        </Link>
                        <div className="flex items-center gap-4 text-text-muted text-sm mb-4">
                            <span>{formatDate(post.date)}</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {post.readTime}
                            </span>
                        </div>
                        <h1
                            className="font-heading text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            {post.title}
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="px-6 sm:px-8 -mt-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-xl overflow-hidden"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-64 sm:h-80 md:h-96 object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 sm:px-8 py-12 sm:py-16 bg-surface">
                <div className="max-w-3xl mx-auto">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="prose-custom"
                    >
                        {renderContent(post.content)}
                    </motion.article>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 p-8 bg-surface-card border border-border-subtle rounded-xl"
                    >
                        <h3 className="font-heading text-xl text-text-primary mb-3">
                            Precisa de ajuda com seu caso?
                        </h3>
                        <p className="text-text-secondary mb-6">
                            Entre em contato de forma confidencial. Avaliamos sua situação sem compromisso.
                        </p>
                        <a
                            href={`https://wa.me/${PHONE}?text=${encodeURIComponent("Olá! Li o artigo sobre " + post.title + " e gostaria de falar com um especialista.")}`}
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

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface-alt">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10"
                        >
                            <span className="section-label">Continue lendo</span>
                            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary">
                                Outros artigos
                            </h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost, i) => (
                                <motion.article
                                    key={relatedPost.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    <Link
                                        to={`/blog/${relatedPost.slug}`}
                                        className="group block h-full bg-surface-card border border-border-subtle rounded-xl overflow-hidden hover:border-gold/30 transition-colors"
                                    >
                                        <div className="aspect-[16/9] overflow-hidden">
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-heading text-base text-text-primary mb-2 group-hover:text-gold transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
                                                Ler
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
