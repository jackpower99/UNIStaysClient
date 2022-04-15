import { useEffect, useState } from "react";

export default function useResponsiveFontSize() {
  const getFontSize = () => (window.innerWidth < 650 ? "10px" : "18px");
  const [fontSize, setFontSize] = useState(getFontSize);

  useEffect(() => {
    const onResize = () => {
      setFontSize(getFontSize());
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return fontSize;
}
