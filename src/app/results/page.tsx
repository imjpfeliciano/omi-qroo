"use client";
import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import ParticipantCard from "@/components/ParticipantCard";
import ParticipantsLoader from "@/components/ParticipantsLoader";
import Container from "@/components/Container";
import ResultsIllustration from "@/assets/images/illustrations/contests_section.svg";

const MIN_YEAR = 2011; // Last year with information on Olimpiada de Informática page
const MIN_CONTEST_ID = 16;

interface ResultsResponse {
  participants: OmiParticipant[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const DEPUTY_LEADER = "OMI Q. Roo";

export default function Results() {
  const currentYear = new Date().getFullYear();
  const currentContestId = currentYear - MIN_YEAR + MIN_CONTEST_ID;

  console.log({ currentYear, currentContestId });
  const years = Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, i) => ({
    year: MIN_YEAR + i,
    contestId: MIN_CONTEST_ID + i,
  }));

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedContestId, setSelectedContestId] = useState(currentContestId);

  const { data, error, isLoading } = useSWR<ResultsResponse>(
    `/api/v1/results?contestId=${selectedContestId}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedYear = parseInt(event.target.value);
    const selectedContestId = selectedYear - MIN_YEAR + MIN_CONTEST_ID;
    setSelectedYear(selectedYear);
    setSelectedContestId(selectedContestId);
  };

  return (
    <Container>
      <h2 className="text-2xl font-bold">Resultados de la delegación:</h2>

      <div className="flex flex-row gap-4">
        <div className="font-semibold">Año de participacion</div>
        <div>
          <select onChange={handleSelectionChange} value={selectedYear}>
            {years.map(({ year, contestId }) => (
              <option key={contestId} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex">
        <h3 className="text-xl">
          Lider de la delegación: <span>{DEPUTY_LEADER}</span>
        </h3>
      </div>

      <div>
        <h4 className="text-lg">Resultados</h4>
        {isLoading && <ParticipantsLoader />}

        {/* TODO: Add empty state */}
        {!isLoading && data?.participants.length === 0 && (
          <div className="w-full">No hay resultados disponibles</div>
        )}
        {!isLoading && (data?.participants || []).length > 0 && (
          <div className="flex flex-col gap-[4rem]">
            <div className="flex flex-col gap-2">
              {data?.participants.map((participant) => (
                <ParticipantCard
                  key={participant.participantId}
                  {...participant}
                />
              ))}
            </div>
            <img
              src={ResultsIllustration.src}
              alt="Resultados"
              className="w-1/2 m-auto"
            />
          </div>
        )}
      </div>
    </Container>
  );
}
