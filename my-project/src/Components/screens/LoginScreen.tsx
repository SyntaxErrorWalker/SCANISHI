import { Screen, Emblem } from "../ui/DesignSystem";
import Icon from "../ui/Icon";

export default function LoginScreen() {
  const feats = [
    { icon: "qr", t: "Сканируй метки", s: "QR и AR-точки в реальном мире" },
    { icon: "gem", t: "Собирай артефакты", s: "Редкие предметы и секреты" },
    { icon: "bolt", t: "Прокачивай уровень", s: "XP, стрики и достижения" },
  ];
  return (
    <Screen>
      <div className="flex flex-1 flex-col px-6">
        <div
          className="flex flex-col items-center gap-[22px]"
          style={{ paddingTop: 96 }}
        >
          <Emblem size={76} />
          <div className="text-center">
            <div
              className="font-ui font-bold text-txt"
              style={{ fontSize: 27, lineHeight: 1.15, letterSpacing: -0.3 }}
            >
              Начни охоту
              <br />
              за скрытым
            </div>
            <div
              className="font-ui text-txt2"
              style={{
                fontSize: 14.5,
                marginTop: 12,
                lineHeight: 1.5,
                maxWidth: 280,
              }}
            >
              Город — это карта. Найди метки, разгадай секреты и поднимись в
              рейтинге.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5" style={{ marginTop: 34 }}>
          {feats.map((f) => (
            <div
              key={f.t}
              className="flex items-center gap-3.5"
              style={{
                padding: "13px 15px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.045)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(139,108,255,0.13)",
                  border: "1px solid rgba(139,108,255,0.25)",
                  color: "#A78BFF",
                }}
              >
                <Icon name={f.icon} size={21} color="#A78BFF" />
              </div>
              <div>
                <div
                  className="font-ui font-semibold text-txt"
                  style={{ fontSize: 14.5 }}
                >
                  {f.t}
                </div>
                <div
                  className="font-ui text-txt3"
                  style={{ fontSize: 12, marginTop: 1 }}
                >
                  {f.s}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div style={{ paddingBottom: 40 }}>
          <div
            className="flex items-center justify-center gap-2.5"
            style={{
              height: 56,
              borderRadius: 17,
              background: "linear-gradient(135deg,#2AABEE,#229ED9)",
              color: "#fff",
              boxShadow:
                "0 0 28px rgba(42,171,238,0.45), 0 10px 24px rgba(0,0,0,0.4)",
            }}
          >
            <Icon name="tg" size={22} color="#fff" sw={1.6} />
            <span className="font-ui font-semibold" style={{ fontSize: 16.5 }}>
              Войти через Telegram
            </span>
          </div>
          <div
            className="font-ui text-txt3 text-center"
            style={{ fontSize: 11, marginTop: 16, lineHeight: 1.5 }}
          >
            Продолжая, ты соглашаешься с{" "}
            <span className="text-txt2">правилами</span> и{" "}
            <span className="text-txt2">политикой данных</span>
          </div>
        </div>
      </div>
    </Screen>
  );
}
