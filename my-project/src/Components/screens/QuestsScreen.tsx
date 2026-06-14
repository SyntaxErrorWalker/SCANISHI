import {
  Screen,
  TgHeader,
  Body,
  GlassCard,
  RarityTag,
} from "../ui/DesignSystem";
import Icon from "../ui/Icon";

interface QuestsScreenProps {
  onNavigate?: (id: string) => void;
}

export default function QuestsScreen({ onNavigate }: QuestsScreenProps) {
  const quests = [
    {
      name: "Тени Старого города",
      steps: "3 / 5",
      pct: 60,
      rar: "epic",
      xp: 450,
      time: "2д 14ч",
    },
    {
      name: "Неоновый след",
      steps: "1 / 3",
      pct: 28,
      rar: "rare",
      xp: 200,
      time: "5д 8ч",
    },
    {
      name: "Затмение: Ночь Реликвий",
      steps: "0 / 7",
      pct: 0,
      rar: "mythic",
      xp: 1200,
      time: "1д 6ч",
    },
    {
      name: "Голоса набережной",
      steps: "2 / 4",
      pct: 50,
      rar: "legendary",
      xp: 800,
      time: "3д 20ч",
    },
  ];
  return (
    <Screen nav="quests" onNavigate={onNavigate}>
      <TgHeader title="Квесты" sub="4 АКТИВНЫХ" />
      <Body>
        <div className="flex flex-col gap-3">
          {quests.map((q) => (
            <GlassCard key={q.name} pad={16}>
              <div className="flex items-center justify-between">
                <span
                  className="font-ui font-semibold text-txt"
                  style={{ fontSize: 15 }}
                >
                  {q.name}
                </span>
                <RarityTag rarity={q.rar} />
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <div
                  className="flex-1 overflow-hidden"
                  style={{
                    height: 7,
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
                <span className="font-mono text-txt2" style={{ fontSize: 11 }}>
                  Точка {q.steps}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Icon name="bolt" size={14} color="#3BE0FF" />
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: 12, color: "#3BE0FF" }}
                    >
                      +{q.xp} XP
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="clock"
                      size={14}
                      color="rgba(242,240,251,0.36)"
                    />
                    <span
                      className="font-mono text-txt3"
                      style={{ fontSize: 11 }}
                    >
                      {q.time}
                    </span>
                  </div>
                </div>
                <div
                  className="flex items-center gap-1"
                  style={{ color: "rgba(242,240,251,0.60)" }}
                >
                  <span
                    className="font-ui font-semibold"
                    style={{ fontSize: 12 }}
                  >
                    Продолжить
                  </span>
                  <Icon name="chev" size={14} color="rgba(242,240,251,0.60)" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Body>
    </Screen>
  );
}
