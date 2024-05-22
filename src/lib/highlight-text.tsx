import { ReactNode } from "react";

export const highlightText = (text: string, query: string): ReactNode => {
  if (!query) return text;

  const parts = text.split(new RegExp(`(${query})`, "gi"));
  
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
};
