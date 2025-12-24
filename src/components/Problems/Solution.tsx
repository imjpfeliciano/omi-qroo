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
    <div id="problem-solution" className="flex flex-col gap-4">
      {expanded && (
        <div className="prose prose-lg max-w-none bg-gray-50 rounded-lg p-6 border border-gray-200">
          {content}
        </div>
      )}
      <button
        onClick={toggleExpanded}
        className={clsx(
          "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]",
          {
            "bg-red-600 hover:bg-red-700": expanded,
            "bg-green-600 hover:bg-green-700": !expanded,
          }
        )}
      >
        {expanded ? (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>Ocultar solución</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Mostrar solución</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ProblemSolution;
