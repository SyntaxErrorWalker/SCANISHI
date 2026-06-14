import {
  Screen,
  TgHeader,
  Body,
  GlassCard,
  LevelRing,
  XPBar,
  RarityTag,
} from "../ui/DesignSystem";
import Icon from "../ui/Icon";

interface HomeScreenProps {
  onNavigate?: (id: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const quests = [
    {
      name: "Тени Старого города",
      step: "Точка 3 из 5",
      pct: 60,
      rar: "epic",
      xp: 450,
    },
    {
      name: "Неоновый след",
      step: "Точка 1 из 3",
      pct: 28,
      rar: "rare",
      xp: 200,
    },
  ];
  const tx = [
    {
      src: "Скан · ТЦ «Орбита»",
      xp: 120,
      mult: "×2",
      t: "12 мин назад",
      c: "#3BE0FF",
    },
    { src: "Квест · Тени", xp: 300, mult: null, t: "1 ч назад", c: "#A78BFF" },
    {
      src: "Ачивка · Первооткрыватель",
      xp: 75,
      mult: null,
      t: "вчера",
      c: "#FFC061",
    },
  ];

  return (
    <Screen nav="home" onNavigate={onNavigate}>
      <TgHeader
        title="Привет, Нэйт"
        sub="СЕЗОН 2 · ПУЛЬС ГОРОДА"
        right={
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(242,240,251,0.60)",
            }}
          >
            <Icon name="bell" size={19} color="rgba(242,240,251,0.60)" />
            <div
              className="absolute"
              style={{
                top: 8,
                right: 9,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#FF6CC8",
                boxShadow: "0 0 6px #FF6CC8",
              }}
            />
          </div>
        }
      />
      <Body>
        <GlassCard glow="#8B6CFF" style={{ padding: 16 }}>
          <div className="flex items-center gap-3.5">
            <LevelRing level={14} pct={68} size={66} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="font-ui font-bold text-txt"
                  style={{ fontSize: 18 }}
                >
                  @nate_void
                </span>
              </div>
              <div
                className="mt-1.5 inline-flex items-center gap-1.5"
                style={{
                  padding: "4px 9px",
                  borderRadius: 8,
                  background: "rgba(255,192,97,0.12)",
                  border: "1px solid rgba(255,192,97,0.28)",
                }}
              >
                <Icon name="fire" size={13} color="#FFC061" />
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: 10.5, color: "#FFC061" }}
                >
                  СТРИК 6 ДН · ×1.5 XP
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3.5">
            <XPBar value={6840} max={10000} />
          </div>
        </GlassCard>

        <div
          className="holo mt-3.5"
          style={{
            borderRadius: 20,
            padding: 2,
            background: "linear-gradient(135deg,#8B6CFF 0%,#3BE0FF 100%)",
            backgroundSize: "180% 180%",
            boxShadow: "0 0 30px rgba(139,108,255,0.33)",
          }}
        >
          <div
            className="flex items-center gap-[15px]"
            style={{
              borderRadius: 18,
              background: "linear-gradient(135deg,#15121f,#0d0b16)",
              padding: 18,
            }}
          >
            <div
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: 15,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.17)",
                color: "#3BE0FF",
              }}
            >
              <Icon name="qr" size={28} color="#3BE0FF" sw={2} />
            </div>
            <div className="flex-1">
              <div
                className="font-ui font-bold text-txt"
                style={{ fontSize: 17 }}
              >
                Сканировать метку
              </div>
              <div
                className="font-ui text-txt2"
                style={{ fontSize: 12.5, marginTop: 2 }}
              >
                4 точки рядом · до 250 XP
              </div>
            </div>
            <Icon name="arrow" size={22} color="rgba(242,240,251,0.60)" />
          </div>
        </div>

        <div className="mt-[18px] flex items-center justify-between">
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 14.5 }}
          >
            Активный ивент
          </span>
        </div>
        <div
          className="relative mt-2.5 overflow-hidden"
          style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <div className="stripes absolute inset-0" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(167,139,255,0.5), rgba(59,224,255,0.28) 55%, rgba(255,108,200,0.3))",
            }}
          />
          <div className="relative p-4">
            <RarityTag rarity="mythic" />
            <div
              className="font-ui font-bold"
              style={{
                fontSize: 19,
                color: "#fff",
                marginTop: 10,
                textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              }}
            >
              Затмение: Ночь Реликвий
            </div>
            <div className="flex gap-4 mt-2.5">
              <div className="flex items-center gap-1.5">
                <Icon name="bolt" size={14} color="#fff" />
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: 11.5, color: "#fff" }}
                >
                  ×3 XP
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="clock" size={14} color="#fff" />
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: 11.5, color: "#fff" }}
                >
                  2Д 14Ч
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 14.5 }}
          >
            Активные квесты
          </span>
          <span className="font-mono text-cyan" style={{ fontSize: 11 }}>
            ВСЕ →
          </span>
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {quests.map((q) => (
            <div
              key={q.name}
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
                padding: 14,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-ui font-semibold text-txt"
                  style={{ fontSize: 14.5 }}
                >
                  {q.name}
                </span>
                <RarityTag rarity={q.rar} />
              </div>
              <div className="mt-2.5 flex items-center gap-2.5">
                <div
                  className="flex-1 overflow-hidden"
                  style={{
                    height: 6,
                    borderRadius: 99,
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="holo h-full"
                    style={{
                      width: `${q.pct}%`,
                      background:
                        "linear-gradient(135deg,#8B6CFF 0%,#3BE0FF 100%)",
                      backgroundSize: "180% 180%",
                      borderRadius: 99,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-txt2"
                  style={{ fontSize: 10.5 }}
                >
                  {q.step}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 mb-2.5">
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 14.5 }}
          >
            Недавние награды
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          {tx.map((r, i) => (
            <div
              key={i}
              className="flex items-center gap-3"
              style={{
                padding: "11px 2px",
                borderBottom:
                  i < tx.length - 1
                    ? "1px solid rgba(255,255,255,0.09)"
                    : "none",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: `${r.c}18`,
                  border: `1px solid ${r.c}33`,
                  color: r.c,
                }}
              >
                <Icon name="bolt" size={16} color={r.c} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-txt overflow-hidden whitespace-nowrap"
                  style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    fontSize: 13.5,
                    textOverflow: "ellipsis",
                  }}
                >
                  {r.src}
                </div>
                <div
                  className="font-mono text-txt3"
                  style={{ fontSize: 10, marginTop: 2 }}
                >
                  {r.t}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {r.mult && (
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: 10, color: "#FFC061" }}
                  >
                    {r.mult}
                  </span>
                )}
                <span
                  className="font-mono font-bold"
                  style={{ fontSize: 14, color: r.c }}
                >
                  +{r.xp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Body>
    </Screen>
  );
}
