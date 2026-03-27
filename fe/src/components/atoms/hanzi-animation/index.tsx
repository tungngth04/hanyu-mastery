import HanziWriter from "hanzi-writer";
import { useEffect, useRef } from "react";

interface Props {
  hanzi: string;
}

const HanziAnimation = ({ hanzi }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hanzi || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    const chars = hanzi.split("");

    chars.forEach((char) => {
      const charDiv = document.createElement("div");

      const SIZE = 80;

      charDiv.style.width = `${SIZE}px`;
      charDiv.style.height = `${SIZE}px`;
      charDiv.style.display = "flex";
      charDiv.style.alignItems = "center";
      charDiv.style.justifyContent = "center";
      charDiv.style.position = "relative";

      containerRef.current!.appendChild(charDiv);

      const writer = HanziWriter.create(charDiv, char, {
        width: SIZE,
        height: SIZE,
        showOutline: true,
        strokeColor: "#000",
        padding: 5,
      });

      charDiv.addEventListener("mouseenter", () => {
        writer.animateCharacter();
      });

      charDiv.addEventListener("mouseleave", () => {
        writer.showOutline();
      });
    });
  }, [hanzi]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center gap-1"
    />
  );
};

export default HanziAnimation;
