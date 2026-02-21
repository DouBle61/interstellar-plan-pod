export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#060612",
      }}
    >
      {/* 星际飞船 SVG */}
      <div
        style={{
          animation: "shipFly 2s ease-in-out infinite",
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 0 15px rgba(109,40,217,0.6))",
          }}
        >
          <path
            d="M40 8L28 45H52L40 8Z"
            fill="url(#shipGrad)"
            stroke="rgba(232,213,245,0.3)"
            strokeWidth="1"
          />
          <circle cx="40" cy="28" r="4" fill="#67e8f9" opacity="0.8" />
          <path
            d="M28 45L18 58H32L28 45Z"
            fill="rgba(109,40,217,0.6)"
            stroke="rgba(232,213,245,0.2)"
            strokeWidth="0.5"
          />
          <path
            d="M52 45L62 58H48L52 45Z"
            fill="rgba(109,40,217,0.6)"
            stroke="rgba(232,213,245,0.2)"
            strokeWidth="0.5"
          />
          <path
            d="M35 58L40 72L45 58"
            fill="url(#flameGrad)"
            style={{ animation: "pulseStar 2s ease-in-out infinite" }}
          />
          <defs>
            <linearGradient
              id="shipGrad"
              x1="40"
              y1="8"
              x2="40"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#b388ff" />
              <stop offset="1" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient
              id="flameGrad"
              x1="40"
              y1="58"
              x2="40"
              y2="72"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#f97316" />
              <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 加载文字 */}
      <p
        style={{
          marginTop: "24px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "14px",
          letterSpacing: "0.3em",
          color: "#d4b8ff",
          animation: "pulseStar 2s ease-in-out infinite",
        }}
      >
        LAUNCHING...
      </p>

      {/* 进度条 */}
      <div
        style={{
          marginTop: "16px",
          height: "2px",
          width: "128px",
          overflow: "hidden",
          borderRadius: "9999px",
          backgroundColor: "rgba(109,40,217,0.2)",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "9999px",
            background: "linear-gradient(to right, #7c3aed, #67e8f9)",
            animation: "loadBar 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* 内联关键帧动画 —— 不再用 styled-jsx */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes shipFly {
              0%, 100% { transform: translateX(0) translateY(0); }
              25% { transform: translateX(5px) translateY(-3px); }
              75% { transform: translateX(-5px) translateY(3px); }
            }
            @keyframes pulseStar {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
            @keyframes loadBar {
              0% { width: 0%; margin-left: 0%; }
              50% { width: 60%; margin-left: 20%; }
              100% { width: 0%; margin-left: 100%; }
            }
          `,
        }}
      />
    </div>
  );
}