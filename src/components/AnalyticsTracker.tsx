import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Declare global types for analytics
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        fbq: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export function AnalyticsTracker() {
    const location = useLocation();
    const scrollDepthsTracked = useRef<Set<number>>(new Set());
    const startTime = useRef<number>(Date.now());
    const timeThresholds = useRef<Set<number>>(new Set());

    // Track page view on route change
    useEffect(() => {
        // Reset trackers on page change
        scrollDepthsTracked.current = new Set();
        startTime.current = Date.now();
        timeThresholds.current = new Set();

        // Send page view
        if (window.gtag) {
            window.gtag("event", "page_view", {
                page_path: location.pathname,
                page_title: document.title,
            });
        }

        if (window.fbq) {
            window.fbq("track", "PageView");
        }
    }, [location.pathname]);

    // Scroll depth tracking
    useEffect(() => {
        const scrollDepths = [25, 50, 75, 90, 100];

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);

            scrollDepths.forEach((depth) => {
                if (scrollPercent >= depth && !scrollDepthsTracked.current.has(depth)) {
                    scrollDepthsTracked.current.add(depth);

                    if (window.gtag) {
                        window.gtag("event", "scroll_depth", {
                            event_category: "engagement",
                            event_label: `${depth}%`,
                            value: depth,
                            page_path: location.pathname,
                        });
                    }

                    // Facebook custom event for high engagement
                    if (depth >= 75 && window.fbq) {
                        window.fbq("trackCustom", "HighEngagement", {
                            scroll_depth: depth,
                            page: location.pathname,
                        });
                    }
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    // Time on page tracking
    useEffect(() => {
        const timeThresholdsMs = [15000, 30000, 60000, 120000, 300000]; // 15s, 30s, 1m, 2m, 5m

        const checkTimeOnPage = () => {
            const timeSpent = Date.now() - startTime.current;

            timeThresholdsMs.forEach((threshold) => {
                if (timeSpent >= threshold && !timeThresholds.current.has(threshold)) {
                    timeThresholds.current.add(threshold);
                    const seconds = threshold / 1000;

                    if (window.gtag) {
                        window.gtag("event", "time_on_page", {
                            event_category: "engagement",
                            event_label: `${seconds}s`,
                            value: seconds,
                            page_path: location.pathname,
                        });
                    }

                    // Track high engagement users
                    if (threshold >= 60000 && window.fbq) {
                        window.fbq("trackCustom", "EngagedUser", {
                            time_seconds: seconds,
                            page: location.pathname,
                        });
                    }
                }
            });
        };

        const interval = setInterval(checkTimeOnPage, 5000);
        return () => clearInterval(interval);
    }, [location.pathname]);

    // Track CTA clicks
    useEffect(() => {
        const trackClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const ctaElement = target.closest("a, button");

            if (!ctaElement) return;

            // Check if it's a WhatsApp link
            const href = ctaElement.getAttribute("href") || "";
            if (href.includes("wa.me") || href.includes("whatsapp")) {
                if (window.gtag) {
                    window.gtag("event", "whatsapp_click", {
                        event_category: "conversion",
                        event_label: location.pathname,
                        value: 1,
                    });
                }

                if (window.fbq) {
                    window.fbq("track", "Contact", {
                        method: "whatsapp",
                        page: location.pathname,
                    });
                }
            }

            // Check if it's an email link
            if (href.includes("mailto:")) {
                if (window.gtag) {
                    window.gtag("event", "email_click", {
                        event_category: "conversion",
                        event_label: location.pathname,
                    });
                }

                if (window.fbq) {
                    window.fbq("track", "Contact", {
                        method: "email",
                        page: location.pathname,
                    });
                }
            }

            // Track primary CTA button clicks
            if (ctaElement.classList.contains("btn-primary")) {
                if (window.gtag) {
                    window.gtag("event", "cta_click", {
                        event_category: "conversion",
                        event_label: ctaElement.textContent?.trim() || "CTA",
                        page_path: location.pathname,
                    });
                }

                if (window.fbq) {
                    window.fbq("track", "Lead", {
                        content_name: ctaElement.textContent?.trim() || "CTA",
                        page: location.pathname,
                    });
                }
            }
        };

        document.addEventListener("click", trackClick);
        return () => document.removeEventListener("click", trackClick);
    }, [location.pathname]);

    return null;
}
