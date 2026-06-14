import { Screen, Emblem, Wordmark } from "../ui/DesignSystem";

export default function SplashScreen() {
  return (
    <Screen>
      <div className="flex flex-1 flex-col items-center justify-center gap-[30px] p-6">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.09)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 220,
            height: 220,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.09)",
            opacity: 0.5,
          }}
        />
        <Emblem size={108} />
        <div className="mt-1">
          <Wordmark size={30} sub="AR Quest Protocol" />
        </div>
        <div className="absolute bottom-[90px] flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === 0 ? "#3BE0FF" : "rgba(255,255,255,0.18)",
              }}
            />
          ))}
        </div>
        <div
          className="font-mono text-txt3 absolute bottom-[54px]"
          style={{ fontSize: 10, letterSpacing: 2 }}
        >
          ИНИЦИАЛИЗАЦИЯ · v0.9
        </div>
      </div>
    </Screen>
  );
}
