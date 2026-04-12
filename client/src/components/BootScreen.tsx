/**
 * BootScreen — Tela de inicialização do sistema
 * Design: Dark Ops Intelligence Dashboard
 * Simula uma sequência de boot de sistema forense antes de exibir o dashboard
 * Clique em qualquer lugar para pular a animação
 */
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { playBootBeep, playSuccessChime, playWarningTone } from "@/lib/soundEngine";

interface BootLine {
  text: string;
  delay: number;
  type: "system" | "ok" | "warn" | "header" | "progress";
}

const bootSequence: BootLine[] = [
  { text: "META FORENSIC PLATFORM v2.4.1", delay: 0, type: "header" },
  { text: "Copyright (c) 2024 Meta Platforms, Inc.", delay: 200, type: "system" },
  { text: "", delay: 400, type: "system" },
  { text: "Initializing secure environment...", delay: 600, type: "system" },
  { text: "[  OK  ] Kernel security modules loaded", delay: 1000, type: "ok" },
  { text: "[  OK  ] Hardware encryption engine detected (AES-NI)", delay: 1400, type: "ok" },
  { text: "[  OK  ] Secure memory allocation enabled", delay: 1700, type: "ok" },
  { text: "", delay: 1900, type: "system" },
  { text: "Loading network stack...", delay: 2100, type: "system" },
  { text: "[  OK  ] TLS 1.3 protocol stack initialized", delay: 2500, type: "ok" },
  { text: "[  OK  ] VPN tunnel established (256-bit)", delay: 2900, type: "ok" },
  { text: "[  OK  ] DNS-over-HTTPS resolver active", delay: 3200, type: "ok" },
  { text: "[ WARN ] Tor relay fallback configured", delay: 3500, type: "warn" },
  { text: "", delay: 3700, type: "system" },
  { text: "Authenticating partner credentials...", delay: 3900, type: "system" },
  { text: "[  OK  ] Meta Partner API key validated", delay: 4400, type: "ok" },
  { text: "[  OK  ] Forensic investigation license: ACTIVE", delay: 4800, type: "ok" },
  { text: "[  OK  ] Access level: UNRESTRICTED", delay: 5100, type: "ok" },
  { text: "", delay: 5300, type: "system" },
  { text: "Mounting platform modules...", delay: 5500, type: "system" },
  { text: "[  OK  ] WhatsApp Investigation Module v3.2.1", delay: 5900, type: "ok" },
  { text: "[  OK  ] Instagram Analysis Module v3.1.8", delay: 6200, type: "ok" },
  { text: "[  OK  ] Messenger Forensic Module v3.0.5", delay: 6500, type: "ok" },
  { text: "", delay: 6700, type: "system" },
  { text: "Running integrity checks...", delay: 6900, type: "system" },
  { text: "[  OK  ] Database integrity: VERIFIED", delay: 7300, type: "ok" },
  { text: "[  OK  ] Encryption keys: ROTATED", delay: 7600, type: "ok" },
  { text: "[  OK  ] Audit log: ENABLED", delay: 7900, type: "ok" },
  { text: "", delay: 8100, type: "system" },
  { text: "System ready. Launching dashboard...", delay: 8300, type: "header" },
  { text: "████████████████████████████████████████", delay: 8600, type: "progress" },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<BootLine[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const skippedRef = useRef(false);

  const skipBoot = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleLines(bootSequence);
    setBootDone(true);
    playSuccessChime();
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 400);
    }, 500);
  }, [onComplete]);

  useEffect(() => {
    bootSequence.forEach((line) => {
      const t = setTimeout(() => {
        if (skippedRef.current) return;
        setVisibleLines((prev) => [...prev, line]);
        // Play sound based on line type
        if (line.type === "ok") playBootBeep();
        else if (line.type === "warn") playWarningTone();
        else if (line.type === "header" && line.delay > 0) playSuccessChime();
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    // Boot complete
    const doneTimeout = setTimeout(() => {
      if (skippedRef.current) return;
      setBootDone(true);
      playSuccessChime();
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 600);
      }, 800);
    }, 9400);
    timeoutsRef.current.push(doneTimeout);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const getLineColor = (type: BootLine["type"]) => {
    switch (type) {
      case "header": return "text-[#58a6ff] font-bold";
      case "ok": return "text-[#39ff14]";
      case "warn": return "text-amber-400";
      case "progress": return "text-[#58a6ff]";
      default: return "text-[#8b949e]";
    }
  };

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#0a0e14] flex flex-col cursor-pointer"
          onClick={skipBoot}
        >
          {/* CRT scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          {/* Top bar */}
          <div className="px-6 py-3 border-b border-[#1c2333]/50 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-['IBM_Plex_Mono'] text-[11px] text-[#484f58]">
                meta-forensic-platform — boot sequence
              </span>
            </div>
            {!bootDone && (
              <span className="font-['IBM_Plex_Mono'] text-[10px] text-[#484f58] animate-pulse">
                Clique para pular
              </span>
            )}
          </div>

          {/* Boot log */}
          <div
            ref={containerRef}
            className="flex-1 px-6 py-4 overflow-y-auto font-['IBM_Plex_Mono'] text-[12px] sm:text-[13px] leading-[1.7] z-20"
          >
            {visibleLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
                className={getLineColor(line.type)}
              >
                {line.text || "\u00A0"}
              </motion.div>
            ))}
            {!bootDone && visibleLines.length > 0 && (
              <span
                className="inline-block w-[8px] h-[15px] bg-[#58a6ff] align-middle"
                style={{ animation: "blink 0.6s step-end infinite" }}
              />
            )}
          </div>

          {/* Boot complete overlay */}
          {bootDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center z-30 bg-[#0a0e14]/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#58a6ff]/10 border border-[#58a6ff]/30 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-[#58a6ff]" />
                </div>
                <p className="font-['Space_Grotesk'] text-xl font-bold text-white mb-1">
                  Sistema Pronto
                </p>
                <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#39ff14]">
                  TODOS OS MÓDULOS OPERACIONAIS
                </p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
