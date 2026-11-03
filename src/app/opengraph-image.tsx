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
          backgroundColor: "#f8f3e8",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(20, 33, 61, 0.08) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(201, 162, 39, 0.12) 0%, transparent 45%)",
          color: "#14213d",
          padding: "40px",
          border: "16px solid #ffffff",
        }}
      >
        {/* Monograma W60 con marco dorado de pastel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "4px solid #c9a227",
            backgroundColor: "#ffffff",
            boxShadow: "0 10px 25px rgba(20, 33, 61, 0.12)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "68px",
              fontFamily: "serif",
              fontStyle: "italic",
              fontWeight: "bold",
              color: "#c9a227",
            }}
          >
            W
          </span>
          <span
            style={{
              fontSize: "44px",
              fontFamily: "serif",
              fontWeight: "bold",
              color: "#14213d",
              marginLeft: "4px",
            }}
          >
            60
          </span>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: "20px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#14213d",
            opacity: 0.75,
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          Celebramos los 60 Años de
        </div>

        {/* Título Principal tipo topper */}
        <div
          style={{
            fontSize: "64px",
            fontFamily: "serif",
            fontWeight: "bold",
            textAlign: "center",
            color: "#c9a227",
            marginBottom: "4px",
          }}
        >
          Walfre Torres Antolín
        </div>

        {/* Fecha y Lugar en cápsula blanca con borde dorado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "24px",
            color: "#14213d",
            backgroundColor: "#ffffff",
            padding: "12px 36px",
            borderRadius: "9999px",
            border: "2px solid #c9a227",
            boxShadow: "0 6px 16px rgba(20, 33, 61, 0.08)",
            marginTop: "16px",
            fontWeight: 600,
          }}
        >
          <span>30 de diciembre</span>
          <span style={{ color: "#c9a227" }}>·</span>
          <span>2:00 p. m.</span>
          <span style={{ color: "#c9a227" }}>·</span>
          <span>Chacaltianguis, Veracruz</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
