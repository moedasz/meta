import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS, formatDate } from "../data/blogPosts";

export function Blog() {
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
                        <span className="section-label">Blog</span>
                        <h1
                            className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 tracking-tight text-gradient-headline"
                            style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
                        >
                            Artigos e insights
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-text-secondary text-lg max-w-2xl mx-auto"
                        style={{ lineHeight: 1.7, fontWeight: 400 }}
                    >
                        Conteúdo sobre investigação, segurança e inteligência para quem quer tomar decisões informadas.
                    </motion.p>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="px-6 sm:px-8 py-16 sm:py-24 bg-surface">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLOG_POSTS.map((post, i) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            >
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="group block h-full bg-surface-card border border-border-subtle rounded-xl overflow-hidden hover:border-gold/30 transition-colors"
                                >
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-text-muted text-sm mb-3">
                                            <span>{formatDate(post.date)}</span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h2 className="font-heading text-lg text-text-primary mb-2 group-hover:text-gold transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-gold text-sm font-medium">
                                            Ler artigo
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
