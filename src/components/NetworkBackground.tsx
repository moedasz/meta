import { useEffect, useRef, useCallback } from "react";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    opacity: number;
    pulseOffset: number;
}

export function NetworkBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const pointsRef = useRef<Point[]>([]);

    const createPoints = useCallback((width: number, height: number): Point[] => {
        const points: Point[] = [];
        const numPoints = Math.min(40, Math.floor((width * height) / 25000));
        
        for (let i = 0; i < numPoints; i++) {
            points.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: 0.3 + Math.random() * 0.4,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        }
        return points;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            pointsRef.current = createPoints(rect.width, rect.height);
        };

        resize();
        window.addEventListener("resize", resize);

        let time = 0;
        const goldColor = { r: 192, g: 57, b: 43 }; // #C0392B crimson

        const animate = () => {
            if (!canvas || !ctx) return;
            
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            time += 0.01;
            const points = pointsRef.current;

            // Update and draw points
            points.forEach((point, i) => {
                if (!prefersReducedMotion) {
                    point.x += point.vx;
                    point.y += point.vy;

                    // Bounce off edges
                    if (point.x < 0 || point.x > rect.width) point.vx *= -1;
                    if (point.y < 0 || point.y > rect.height) point.vy *= -1;

                    // Pulse opacity
                    point.opacity = 0.3 + Math.sin(time * 2 + point.pulseOffset) * 0.2;
                }

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${point.opacity})`;
                ctx.fill();

                // Draw connections to nearby points
                for (let j = i + 1; j < points.length; j++) {
                    const other = points[j];
                    const dx = point.x - other.x;
                    const dy = point.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const lineOpacity = (1 - distance / 150) * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, [createPoints]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.25 }}
            aria-hidden="true"
        />
    );
}
