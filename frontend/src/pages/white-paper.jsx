import { useRouter } from "next/router";

export default function WhitePaper() {
  const router = useRouter();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "auto",
        padding: "20px",
      }}
    >
      <button
        aria-label="Close"
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 28,
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <div
        style={{
          width: "90%",
          height: "90%",
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(255,255,255,0.2)",
        }}
      >
        <iframe
          src="/assets/whitepaper.pdf"
          title="White Paper"
          width="100%"
          height="100%"
          style={{
            border: "none",
          }}
        ></iframe>
      </div>
    </div>
  );
}
