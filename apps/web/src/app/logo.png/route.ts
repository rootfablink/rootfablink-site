import { ImageResponse } from "next/og";
import { createElement } from "react";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    createElement(
      "div",
      {
        style: {
          alignItems: "center",
          background: "#ffffff",
          color: "#111111",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          fontSize: 92,
          fontWeight: 700,
          height: "100%",
          justifyContent: "center",
          letterSpacing: 0,
          width: "100%"
        }
      },
      createElement("span", null, "ROOTFAB"),
      createElement("span", { style: { color: "#f97316" } }, "LINK")
    ),
    {
      width: 1200,
      height: 300
    }
  );
}
