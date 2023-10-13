"use client";
import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { OmiParticipant } from "../api/v1/results/route";

const MIN_YEAR = 2013; // Last year with information on Olimpiada de Informática page
const MIN_CONTEST_ID = 18;

interface ResultsResponse {
  participants: OmiParticipant[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Results() {
  const currentYear = new Date().getFullYear() ;
  const currentContestId = currentYear - MIN_YEAR + MIN_CONTEST_ID;

  console.log({ currentYear, currentContestId })
  const years = Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, i) => ({
    year: MIN_YEAR + i,
    contestId: MIN_CONTEST_ID + i,
  }));

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedContestId, setSelectedContestId] = useState(currentContestId);

  const { data, error } = useSWR<ResultsResponse>(
    `/api/v1/results?contestId=${selectedContestId}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;

  const { participants } = data;

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(event.target.value);
    const selectedContestId = selectedYear - MIN_YEAR + MIN_CONTEST_ID;
    setSelectedYear(selectedYear);
    setSelectedContestId(selectedContestId);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Resultados de la delegación</h2>

      <div className="flex flex-row gap-4">
        <div>Año de participacion</div>
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

      <div>
        <h3 className="text-xl">Lider de la delegación</h3>
        <h4 className="text-lg">Nombre</h4>
      </div>

      <div>
        <h4 className="text-lg">Resultados</h4>

        <div className="flex flex-col border">
          {participants.map((participant) => (
            <div
              className="flex flex-row gap-4"
              key={participant.participantId}
            >
              <div>{participant.name}</div>
              <div>{participant.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
