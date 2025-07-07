import { useState } from "react";

export function ReadMore({
  text,
  maxLength = 100,
}: { text: string; maxLength?: number }) {
  const [showAll, setShowAll] = useState(false);

  const isLong = text.length > maxLength;
  const textToShow =
    showAll || !isLong ? text : `${text.slice(0, maxLength)}...`;

  return (
    <p className="text-secondary fs-6">
      {textToShow}
      {isLong && (
        <button
          className="btn text-dark fw-bold text-decoration-underline btn-sm p-0 fs-7"
          onClick={() => setShowAll(!showAll)}
          type="button"
        >
          {showAll ? "voir moins" : "voir plus"}
        </button>
      )}
    </p>
  );
}
