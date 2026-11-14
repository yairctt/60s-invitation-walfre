import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Invitación 60 Años Walfre Torres Antolín";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a1224",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(201, 162, 39, 0.28) 0%, transparent 55%), radial-gradient(circle at 50% 100%, rgba(31, 49, 88, 0.8) 0%, transparent 60%)",
          color: "#fdfbf7",
          padding: "40px",
        }}
      >
        {/* Marco dorado fino */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid rgba(230, 198, 90, 0.6)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: "22px",
            letterSpacing: "10px",
            textTransform: "uppercase",
            color: "#e6c65a",
            fontWeight: 600,
            marginBottom: "18px",
          }}
        >
          Celebramos los 60 años de
        </div>

        <div
          style={{
            fontSize: "92px",
            fontFamily: "serif",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fdfbf7",
            lineHeight: 1.05,
          }}
        >
          Walfre Torres Antolín
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "320px",
            margin: "30px 0",
          }}
        >
          <div style={{ flex: 1, height: "2px", backgroundColor: "#c9a227", display: "flex" }} />
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: "#e6c65a",
              transform: "rotate(45deg)",
              margin: "0 16px",
              display: "flex",
            }}
          />
          <div style={{ flex: 1, height: "2px", backgroundColor: "#c9a227", display: "flex" }} />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "30px",
            color: "#e6c65a",
            fontWeight: 600,
            letterSpacing: "2px",
          }}
        >
          <span>30 de diciembre</span>
          <span>·</span>
          <span>2:00 p. m.</span>
          <span>·</span>
          <span>Chacaltianguis, Veracruz</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
