import { Screen, Body, GlassCard, RarityTag } from "../ui/DesignSystem";
import Icon from "../ui/Icon";

interface ScanScreenProps {
  onNavigate?: (id: string) => void;
}

export default function ScanScreen({ onNavigate }: ScanScreenProps) {
  return (
    <Screen nav="scan" onNavigate={onNavigate}>
      <div className="flex flex-1 flex-col">
        <div
          className="flex items-center justify-center"
          style={{ paddingTop: 58, paddingBottom: 8 }}
        >
          <span
            className="font-ui font-semibold text-txt"
            style={{ fontSize: 18 }}
          >
            Сканер
          </span>
        </div>
        <Body pb={130}>
          <div
            className="relative mx-auto"
            style={{
              width: 260,
              height: 260,
              borderRadius: 24,
              border: "2px solid rgba(59,224,255,0.3)",
              background: "rgba(255,255,255,0.02)",
              overflow: "hidden",
            }}
          >
            <div className="grid-bg absolute inset-0" />
            <div
              className="scanline absolute left-0 right-0"
              style={{
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, #3BE0FF, transparent)",
                boxShadow: "0 0 20px #3BE0FF",
                top: "50%",
              }}
            />
            <div
              className="absolute"
              style={{
                top: 16,
                left: 16,
                width: 24,
                height: 24,
                borderTop: "3px solid #3BE0FF",
                borderLeft: "3px solid #3BE0FF",
                borderRadius: "4px 0 0 0",
              }}
            />
            <div
              className="absolute"
              style={{
                top: 16,
                right: 16,
                width: 24,
                height: 24,
                borderTop: "3px solid #3BE0FF",
                borderRight: "3px solid #3BE0FF",
                borderRadius: "0 4px 0 0",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: 16,
                left: 16,
                width: 24,
                height: 24,
                borderBottom: "3px solid #3BE0FF",
                borderLeft: "3px solid #3BE0FF",
                borderRadius: "0 0 0 4px",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: 16,
                right: 16,
                width: 24,
                height: 24,
                borderBottom: "3px solid #3BE0FF",
                borderRight: "3px solid #3BE0FF",
                borderRadius: "0 0 4px 0",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="pulse absolute"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid rgba(59,224,255,0.4)",
                  top: "50%",
                  left: "50%",
                }}
              />
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "2px solid rgba(59,224,255,0.6)",
                  boxShadow: "0 0 30px rgba(59,224,255,0.3)",
                }}
              />
            </div>
          </div>
          <div className="mt-5 text-center">
            <div
              className="font-ui font-semibold text-txt"
              style={{ fontSize: 16 }}
            >
              Наведи камеру на метку
            </div>
            <div
              className="font-ui text-txt2"
              style={{ fontSize: 13, marginTop: 6 }}
            >
              QR-код или AR-маркер точки
            </div>
          </div>
          <div className="mt-5">
            <GlassCard>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="clock" size={16} color="#A78BFF" />
                  <span className="font-ui text-txt2" style={{ fontSize: 13 }}>
                    Последний скан
                  </span>
                </div>
                <span className="font-mono text-txt3" style={{ fontSize: 11 }}>
                  12 мин назад
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <RarityTag rarity="rare" />
              </div>
            </GlassCard>
          </div>
        </Body>
      </div>
    </Screen>
  );
}
