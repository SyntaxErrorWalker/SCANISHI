import { useEffect, useState } from "react";
import {
  Screen,
  TgHeader,
  Body,
  GlassCard,
  LevelRing,
  XPBar,
  Avatar,
} from "../ui/DesignSystem";
import Icon from "../ui/Icon";
import { initTelegramAuth } from "../../lib/auth";
import { parseJwt } from "../../lib/jwt";
import type { JwtPayload } from "../../lib/jwt";

interface ProfileScreenProps {
  onNavigate?: (id: string) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const [userData, setUserData] = useState<JwtPayload | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      const token = await initTelegramAuth();

      if (isMounted) {
        setUserData(token ? parseJwt(token) : null);
      }
    }

    void loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const displayName =
    typeof userData?.name === "string" && userData.name.trim()
      ? userData.name
      : "Нэйт";
  const username =
    typeof userData?.username === "string" && userData.username.trim()
      ? `@${userData.username}`
      : "@nate_void";

  const stats = [
    { label: "Сканы", val: "47", icon: "qr", c: "#3BE0FF" },
    { label: "Квесты", val: "5", icon: "quest", c: "#A78BFF" },
    { label: "Стрик", val: "6 дн", icon: "fire", c: "#FFC061" },
  ];
  const achs = [
    {
      name: "Первооткрыватель",
      desc: "Первый скан",
      icon: "trophy",
      c: "#FFC061",
      done: true,
    },
    {
      name: "Ночной охотник",
      desc: "Скан после 00:00",
      icon: "star",
      c: "#A78BFF",
      done: true,
    },
    {
      name: "Легенда города",
      desc: "100 сканов",
      icon: "gem",
      c: "#FF6CC8",
      done: false,
    },
  ];
  return (
    <Screen nav="profile" onNavigate={onNavigate}>
      <TgHeader title="Профиль" />
      <Body>
        <GlassCard glow="#8B6CFF" style={{ padding: 18 }}>
          <div className="flex items-center gap-4">
            <Avatar size={60} ring="#A78BFF" seed={2} />
            <div className="flex-1">
              <div
                className="font-ui font-bold text-txt"
                style={{ fontSize: 19 }}
              >
                {displayName}
              </div>
              <div
                className="font-mono text-txt2"
                style={{ fontSize: 12, marginTop: 2 }}
              >
                {username}
              </div>
            </div>
            <LevelRing level={14} pct={68} size={58} />
          </div>
          <div className="mt-3">
            <XPBar value={6840} max={10000} />
          </div>
        </GlassCard>
        <div className="mt-4 flex gap-2.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex-1"
              style={{
                padding: "14px 10px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                textAlign: "center",
              }}
            >
              <Icon name={s.icon} size={20} color={s.c} />
              <div
                className="font-mono font-bold"
                style={{ fontSize: 19, color: s.c, marginTop: 6 }}
              >
                {s.val}
              </div>
              <div
                className="font-ui text-txt3"
                style={{ fontSize: 11, marginTop: 2 }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 14.5 }}
          >
            Достижения
          </span>
          <span className="font-mono text-cyan" style={{ fontSize: 11 }}>
            2 из 12
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {achs.map((a) => (
            <div
              key={a.name}
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                padding: 14,
                opacity: a.done ? 1 : 0.5,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: `${a.c}18`,
                    border: `1px solid ${a.c}33`,
                  }}
                >
                  <Icon name={a.icon} size={20} color={a.c} />
                </div>
                <div className="flex-1">
                  <div
                    className="font-ui font-semibold text-txt"
                    style={{ fontSize: 14 }}
                  >
                    {a.name}
                  </div>
                  <div
                    className="font-ui text-txt3"
                    style={{ fontSize: 12, marginTop: 1 }}
                  >
                    {a.desc}
                  </div>
                </div>
                {a.done && <Icon name="check" size={20} color="#5CE7A3" />}
              </div>
            </div>
          ))}
        </div>
      </Body>
    </Screen>
  );
}
