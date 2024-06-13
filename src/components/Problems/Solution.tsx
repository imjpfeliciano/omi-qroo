"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface ProblemSolutionProps {
  content: React.ReactNode | null;
}

const ProblemSolution: React.FC<ProblemSolutionProps> = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const solutionRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => setExpanded(!expanded);

  useEffect(() => {
    if (expanded && solutionRef.current) {
      solutionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [expanded]);

  return (
    <div id="problem-solution">
      {expanded && <div className="">{content}</div>}
      <button
        onClick={toggleExpanded}
        className={clsx("rounded-full text-white px-4 py-2 ", {
          "bg-red-500": expanded,
          "bg-green-500": !expanded,
        })}
      >
        {expanded ? "Ocultar solución" : "Mostrar solución"}
      </button>
    </div>
  );
};

export default ProblemSolution;
