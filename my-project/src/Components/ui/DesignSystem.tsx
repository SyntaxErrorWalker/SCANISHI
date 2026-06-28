import { useEffect, useState } from "react";
import Icon from "./Icon";

export const RAR: Record<string, { c: string; name: string }> = {
  common: { c: "#9A9AB4", name: "ОБЫЧНЫЙ" },
  rare: { c: "#3BE0FF", name: "РЕДКИЙ" },
  epic: { c: "#A78BFF", name: "ЭПИК" },
  legendary: { c: "#FFC061", name: "ЛЕГЕНДА" },
  mythic: { c: "#FF6CC8", name: "МИФ" },
};

interface EmblemProps {
  size?: number;
  glow?: boolean;
}
export function Emblem({ size = 84, glow = true }: EmblemProps) {
  const hex = "polygon(50% 0%,93% 25%,93% 75%,50% 100%,7% 75%,7% 25%)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {glow && (
        <div
          className="absolute rounded-full"
          style={{
            inset: -size * 0.32,
            background:
              "radial-gradient(circle, rgba(139,108,255,0.55), rgba(59,224,255,0.15) 50%, transparent 72%)",
            filter: "blur(6px)",
          }}
        />
      )}
      <div
        className="holo absolute"
        style={{
          inset: 0,
          clipPath: hex,
          background:
            "linear-gradient(120deg,#A78BFF 0%,#3BE0FF 40%,#FF6CC8 75%,#FFC061 100%)",
          backgroundSize: "180% 180%",
        }}
      />
      <div
        className="absolute"
        style={{ inset: size * 0.07, clipPath: hex, background: "#0A0912" }}
      />
      <div
        className="absolute"
        style={{
          inset: size * 0.13,
          clipPath: hex,
          background:
            "linear-gradient(135deg, rgba(139,108,255,0.22), rgba(59,224,255,0.10))",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: size * 0.3,
            height: size * 0.3,
            border: "2px solid #3BE0FF",
            borderRadius: 4,
            boxShadow: "0 0 12px #3BE0FF",
          }}
        />
        <div
          className="absolute"
          style={{
            width: size * 0.5,
            height: 1.5,
            background: "rgba(59,224,255,0.5)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 1.5,
            height: size * 0.5,
            background: "rgba(59,224,255,0.5)",
          }}
        />
      </div>
    </div>
  );
}

interface WordmarkProps {
  size?: number;
  sub?: string;
}
export function Wordmark({ size = 26, sub }: WordmarkProps) {
  return (
    <div className="text-center">
      <div
        className="font-ui font-bold text-txt"
        style={{
          fontSize: size,
          letterSpacing: size * 0.18,
          paddingLeft: size * 0.18,
        }}
      >
        SKANSHI
      </div>
      {sub && (
        <div
          className="font-mono text-txt3 uppercase"
          style={{ fontSize: 10.5, letterSpacing: 3, marginTop: 6 }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

interface RarityTagProps {
  rarity?: string;
  className?: string;
}
export function RarityTag({ rarity = "rare", className = "" }: RarityTagProps) {
  const r = RAR[rarity] || RAR.rare;
  return (
    <span
      className={`font-mono font-bold uppercase whitespace-nowrap ${className}`}
      style={{
        fontSize: 9.5,
        letterSpacing: 1.5,
        color: r.c,
        padding: "3px 7px",
        borderRadius: 5,
        background: `${r.c}1A`,
        border: `1px solid ${r.c}40`,
      }}
    >
      {r.name}
    </span>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  pad?: number;
  glow?: string;
  onClick?: () => void;
}
export function GlassCard({
  children,
  style = {},
  pad = 16,
  glow,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-[20px]"
      style={{
        padding: pad,
        background: "rgba(255,255,255,0.045)",
        border: "1px solid rgba(255,255,255,0.09)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow: glow
          ? `0 0 0 1px ${glow}30, 0 12px 40px ${glow}22`
          : "0 8px 30px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface XPBarProps {
  value: number;
  max: number;
  height?: number;
  showText?: boolean;
}
export function XPBar({ value, max, height = 8, showText = true }: XPBarProps) {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-full"
        style={{ height, background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="holo h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(135deg,#8B6CFF 0%,#3BE0FF 100%)",
            backgroundSize: "180% 180%",
            boxShadow: "0 0 12px rgba(139,108,255,0.6)",
          }}
        />
      </div>
      {showText && (
        <div className="mt-1.5 flex justify-between">
          <span className="font-mono text-cyan" style={{ fontSize: 11 }}>
            {value.toLocaleString("ru")} XP
          </span>
          <span className="font-mono text-txt3" style={{ fontSize: 11 }}>
            / {max.toLocaleString("ru")}
          </span>
        </div>
      )}
    </div>
  );
}

interface LevelRingProps {
  level: number;
  pct?: number;
  size?: number;
}
export function LevelRing({ level, pct = 64, size = 64 }: LevelRingProps) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#A78BFF" />
            <stop offset="1" stopColor="#3BE0FF" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringg)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct / 100)}
          style={{ filter: "drop-shadow(0 0 4px #8B6CFF)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-mono text-txt3"
          style={{ fontSize: 9, letterSpacing: 1 }}
        >
          LVL
        </span>
        <span
          className="font-mono font-bold text-txt leading-none"
          style={{ fontSize: 20 }}
        >
          {level}
        </span>
      </div>
    </div>
  );
}

interface AvatarProps {
  size?: number;
  ring?: string;
  seed?: number;
  src?: string;
  alt?: string;
}
export function Avatar({ size = 44, ring, seed = 0, src, alt }: AvatarProps) {
  const normalizedSrc = typeof src === "string" && src.trim() ? src.trim() : "";
  const grads = [
    "linear-gradient(135deg,#8B6CFF,#3BE0FF)",
    "linear-gradient(135deg,#FF6CC8,#A78BFF)",
    "linear-gradient(135deg,#3BE0FF,#5CE7A3)",
    "linear-gradient(135deg,#FFC061,#FF6CC8)",
  ];
  const placeholder = grads[Math.abs(seed) % grads.length];
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setLoadError(false);
  }, [normalizedSrc]);

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        background: placeholder,
        boxShadow: ring ? `0 0 0 2px #0A0912, 0 0 0 3.5px ${ring}` : "none",
      }}
    >
      {normalizedSrc && !loadError && (
        <img
          src={normalizedSrc}
          alt={alt || "avatar"}
          className="h-full w-full rounded-full object-cover"
          style={{ background: "rgba(8,7,14,0.6)" }}
          onError={() => {
            setLoadError(true);
          }}
        />
      )}

      {(!normalizedSrc || loadError) && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%)",
          }}
        />
      )}
    </div>
  );
}

interface TgHeaderProps {
  title: string;
  sub?: string;
  right?: React.ReactNode;
  back?: boolean;
}
export function TgHeader({ title, sub, right, back }: TgHeaderProps) {
  return (
    <div
      className="relative z-5 flex items-center gap-3"
      style={{
        paddingTop: 58,
        paddingBottom: 12,
        paddingLeft: 18,
        paddingRight: 18,
        background:
          "linear-gradient(180deg, rgba(16,14,27,0.92), rgba(10,9,18,0))",
      }}
    >
      {back && (
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 34,
            height: 34,
            borderRadius: 11,
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.09)",
            transform: "scaleX(-1)",
          }}
        >
          <Icon name="chev" size={18} color="rgba(242,240,251,0.60)" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div
          className="font-ui font-semibold text-txt"
          style={{ fontSize: 18, lineHeight: 1.1 }}
        >
          {title}
        </div>
        {sub && (
          <div
            className="font-mono text-txt3"
            style={{ fontSize: 10.5, letterSpacing: 0.5, marginTop: 3 }}
          >
            {sub}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}

interface BottomNavProps {
  active?: string;
  onNavigate?: (id: string) => void;
}
export function BottomNav({ active = "home", onNavigate }: BottomNavProps) {
  const items = [
    { id: "home", icon: "home", label: "Главная" },
    { id: "map", icon: "map", label: "Карта" },
    { id: "scan", icon: "qr", label: "Скан", center: true as const },
    { id: "quests", icon: "quest", label: "Квесты" },
    { id: "profile", icon: "user", label: "Профиль" },
  ];

  const handleScanClick = () => {
    // 1. Check if the app is actually running inside Telegram
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      return;
    }

    // 3. Trigger the native Telegram QR scanner popup
    tg.showScanQrPopup(
      {
        text: "Align the QR code inside the frame to scan", // Custom description text
      },
      () => {
        return true;
      },
    );
  };

  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-40"
      style={{
        paddingBottom: 26,
        paddingTop: 10,
        background:
          "linear-gradient(180deg, rgba(10,9,18,0), rgba(10,9,18,0.96) 38%)",
      }}
    >
      <div
        className="mx-[14px] flex items-center justify-around rounded-[22px] px-1.5"
        style={{
          height: 60,
          background: "rgba(20,18,32,0.86)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {items.map((it) => {
          if (it.center)
            return (
              <div key={it.id} className="relative w-14 flex justify-center">
                <button
                  key={it.id}
                  onClick={() => handleScanClick()}
                  className="holo flex items-center justify-center"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 18,
                    marginTop: -26,
                    background:
                      "linear-gradient(135deg,#8B6CFF 0%,#3BE0FF 100%)",
                    backgroundSize: "180% 180%",
                    color: "#0A0912",
                    boxShadow:
                      "0 0 22px rgba(139,108,255,0.67), 0 8px 20px rgba(0,0,0,0.5)",
                    border: "2px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <Icon name="qr" size={26} color="#0A0912" sw={2} />
                </button>
              </div>
            );
          const on = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => onNavigate?.(it.id)}
              className="flex w-[58px] flex-col items-center gap-0.5"
              style={{ color: on ? "#A78BFF" : "rgba(242,240,251,0.36)" }}
            >
              <Icon
                name={it.icon}
                size={22}
                color={on ? "#A78BFF" : "rgba(242,240,251,0.42)"}
              />
              <span
                className={`font-ui ${on ? "font-semibold" : "font-medium"}`}
                style={{
                  fontSize: 9.5,
                  color: on ? "#A78BFF" : "rgba(242,240,251,0.36)",
                }}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface ScreenProps {
  children: React.ReactNode;
  nav?: string;
  glow?: boolean;
  onNavigate?: (id: string) => void;
}
export function Screen({
  children,
  nav,
  glow = true,
  onNavigate,
}: ScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-bg">
      {glow && (
        <>
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              top: -80,
              right: -60,
              width: 280,
              height: 280,
              background:
                "radial-gradient(circle, rgba(139,108,255,0.30), transparent 68%)",
              filter: "blur(20px)",
            }}
          />
          <div
            className="pointer-events-none absolute rounded-full"
            style={{
              bottom: 40,
              left: -90,
              width: 260,
              height: 260,
              background:
                "radial-gradient(circle, rgba(59,224,255,0.18), transparent 68%)",
              filter: "blur(20px)",
            }}
          />
        </>
      )}
      <div
        className="grain pointer-events-none absolute inset-0 z-1"
        style={{ opacity: 0.5 }}
      />
      <div className="relative z-2 flex min-h-0 flex-1 flex-col">
        {children}
      </div>
      {nav && <BottomNav active={nav} onNavigate={onNavigate} />}
    </div>
  );
}

interface BodyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  pb?: number;
}
export function Body({ children, style = {}, pb = 110 }: BodyProps) {
  return (
    <div
      className="noscroll flex-1 overflow-y-auto"
      style={{ padding: `0 18px ${pb}px`, ...style }}
    >
      {children}
    </div>
  );
}
