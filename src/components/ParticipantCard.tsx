"use client";
import GoldMedal from "../assets/images/medals/gold_medal.png";
import SilverMedal from "../assets/images/medals/silver_medal.png";
import BronzeMedal from "../assets/images/medals/bronze_medal.png";
import { StaticImageData } from "next/image";
import { useState } from "react";

const MedalMapping: Record<string, StaticImageData> = {
  ORO: GoldMedal,
  PLATA: SilverMedal,
  BRONCE: BronzeMedal,
};

const MedalLabels: Record<string, string> = {
  ORO: "Medalla de Oro",
  PLATA: "Medalla de Plata",
  BRONCE: "Medalla de Bronce",
};

const RankMedal = ({ rank }: { rank: string }) => {
  const ImageMedal: StaticImageData = MedalMapping[rank];
  const [showTooltip, setShowTooltip] = useState(false);

  if (!ImageMedal) {
    return <span className="text-sm text-gray-600 font-medium">{rank}</span>;
  }

  const medalLabel = MedalLabels[rank] || rank;

  return (
    <div className="relative flex items-center gap-2">
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img
          src={ImageMedal.src}
          alt={`Medallista de ${rank.toLowerCase()}`}
          className="w-10 h-10 cursor-help shrink-0 transition-transform duration-200 hover:scale-110"
          width={ImageMedal.width}
          height={ImageMedal.height}
        />
        {/* Material Design Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded shadow-lg z-10 whitespace-nowrap pointer-events-none animate-in fade-in duration-200">
            {medalLabel}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-gray-800"></div>
            </div>
          </div>
        )}
      </div>
      {/* Label next to medal */}
      <span className="text-sm text-gray-700 font-medium hidden sm:inline">
        {medalLabel}
      </span>
    </div>
  );
};

// TODO: Add image and link to ioi profile (if available)
const ParticipantCard: React.FC<OmiParticipant> = ({
  participantId,
  name,
  medal,
  school,
  standing,
}) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md p-6 transition-all duration-300 ease-in-out border border-gray-200 hover:border-gray-300">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Posición
        </span>
        <span className="text-lg font-medium text-gray-900">
          {participantId} - {standing}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Medalla
        </span>
        <RankMedal rank={medal || "- - -"} />
      </div>
      <div className="md:col-span-2 flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Nombre
        </span>
        <span className="text-base font-medium text-gray-900 uppercase">
          {name}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Escuela
        </span>
        <span className="text-base text-gray-700">{school}</span>
      </div>
    </div>
  </div>
);

export default ParticipantCard;
