import GoldMedal from "../assets/images/medals/gold_medal.png";
import SilverMedal from "../assets/images/medals/silver_medal.png";
import BronzeMedal from "../assets/images/medals/bronze_medal.png";
import { StaticImageData } from "next/image";

const MedalMapping: Record<string, StaticImageData> = {
  ORO: GoldMedal,
  PLATA: SilverMedal,
  BRONCE: BronzeMedal,
};

const RankMedal = ({ rank }: { rank: string }) => {
  const ImageMedal: StaticImageData = MedalMapping[rank];

  if (!ImageMedal) return rank;

  return <img src={ImageMedal.src} alt={rank} className="w-8 h-8" />;
};

// TODO: Add image and link to ioi profile (if available)
const ParticipantCard: React.FC<OmiParticipant> = ({
  participantId,
  name,
  medal,
  school,
  standing,
}) => (
  <div className="grid grid-cols-5 gap-2 bg-white shadow-lg p-4 rounded hover:scale-105 transition-all duration-150 ease-in-out cursor-pointer">
    <div className="font-bold">
      {participantId} - {standing}
    </div>
    <div className="">
      <RankMedal rank={medal || "- - -"} />
    </div>
    <div className="uppercase col-span-2">{name}</div>
    <div>{school}</div>
  </div>
);

export default ParticipantCard;
