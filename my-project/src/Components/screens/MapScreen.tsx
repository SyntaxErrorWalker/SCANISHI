import { Screen, Body, GlassCard, RarityTag } from "../ui/DesignSystem";
import Icon from "../ui/Icon";

interface MapScreenProps {
  onNavigate?: (id: string) => void;
}

export default function MapScreen({ onNavigate }: MapScreenProps) {
  const points = [
    { name: "ТЦ «Орбита» · Вход", dist: "120 м", rar: "rare", xp: 120 },
    { name: "Сквер у фонтана", dist: "340 м", rar: "epic", xp: 200 },
    { name: "Старая водонапорная", dist: "890 м", rar: "legendary", xp: 350 },
    { name: "Мурал на Садовой", dist: "1.2 км", rar: "common", xp: 50 },
  ];
  return (
    <Screen nav="map" onNavigate={onNavigate}>
      <div className="flex flex-1 flex-col">
        <div
          className="flex items-center justify-center"
          style={{ paddingTop: 58, paddingBottom: 8 }}
        >
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 18 }}
          >
            Карта
          </span>
        </div>
        <Body>
          <div
            className="relative"
            style={{
              height: 220,
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div className="grid-bg absolute inset-0 bg-bg2" />
            <div
              className="absolute"
              style={{
                top: "40%",
                left: "30%",
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#8B6CFF",
                boxShadow: "0 0 16px #8B6CFF",
                border: "3px solid #0A0912",
              }}
            />
            <div
              className="absolute"
              style={{
                top: "25%",
                left: "55%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#3BE0FF",
                boxShadow: "0 0 12px #3BE0FF",
                border: "2px solid #0A0912",
              }}
            />
            <div
              className="absolute"
              style={{
                top: "60%",
                left: "65%",
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#FFC061",
                boxShadow: "0 0 12px #FFC061",
                border: "2px solid #0A0912",
              }}
            />
            <div
              className="absolute"
              style={{
                top: "70%",
                left: "25%",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#9A9AB4",
                boxShadow: "0 0 8px #9A9AB4",
                border: "2px solid #0A0912",
              }}
            />
            <div
              className="absolute bottom-3 left-3 flex items-center gap-1.5"
              style={{
                padding: "6px 10px",
                borderRadius: 10,
                background: "rgba(10,9,18,0.85)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Icon name="user" size={14} color="#A78BFF" />
              <span
                className="font-mono"
                style={{ fontSize: 10, color: "rgba(242,240,251,0.60)" }}
              >
                Вы здесь
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span
              className="font-ui font-semibold text-txt"
              style={{ fontSize: 14.5 }}
            >
              Точки рядом
            </span>
            <span className="font-mono text-cyan" style={{ fontSize: 11 }}>
              {points.length} ДОСТУПНО
            </span>
          </div>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {points.map((p) => (
              <GlassCard key={p.name} pad={14}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex shrink-0 items-center justify-center"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 13,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <Icon name="map" size={20} color="#3BE0FF" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-ui font-semibold text-txt overflow-hidden whitespace-nowrap block"
                      style={{ fontSize: 14, textOverflow: "ellipsis" }}
                    >
                      {p.name}
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <span
                        className="font-mono text-txt2"
                        style={{ fontSize: 10.5 }}
                      >
                        {p.dist}
                      </span>
                      <span
                        className="font-mono font-bold"
                        style={{
                          fontSize: 10.5,
                          color:
                            p.rar === "legendary"
                              ? "#FFC061"
                              : p.rar === "epic"
                                ? "#A78BFF"
                                : p.rar === "rare"
                                  ? "#3BE0FF"
                                  : "#9A9AB4",
                        }}
                      >
                        +{p.xp} XP
                      </span>
                    </div>
                  </div>
                  <RarityTag rarity={p.rar} />
                </div>
              </GlassCard>
            ))}
          </div>
        </Body>
      </div>
    </Screen>
  );
}
