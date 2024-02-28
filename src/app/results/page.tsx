"use client";
import useSWR from "swr";
import { useState } from "react";
import ParticipantCard from "@/components/ParticipantCard";
import ParticipantsLoader from "@/components/ParticipantsLoader";
import Container from "@/components/Container";
import ResultsIllustration from "@/assets/images/illustrations/contests_section.svg";
import NoResults from "@/components/NoResults";

const MIN_YEAR = 2011; // Last year with information on Olimpiada de Informática page
const MIN_CONTEST_ID = 16;

interface ResultsResponse {
  participants: OmiParticipant[];
  teamInformation: TeamInformation[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 500) {
    throw new Error("Server error");
  }
  return res.json();
};

const DEPUTY_LEADER = "OMI Q. Roo";

export default function Results() {
  const currentYear = new Date().getFullYear();
  const currentContestId = currentYear - MIN_YEAR + MIN_CONTEST_ID;

  const years = Array.from({ length: currentYear - MIN_YEAR + 1 }, (_, i) => ({
    year: MIN_YEAR + i,
    contestId: MIN_CONTEST_ID + i,
  }));

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedContestId, setSelectedContestId] = useState(currentContestId);

  const { data, error, isLoading } = useSWR<ResultsResponse>(
    `/api/v1/results?contestId=${selectedContestId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedYear = parseInt(event.target.value);
    const selectedContestId = selectedYear - MIN_YEAR + MIN_CONTEST_ID;
    setSelectedYear(selectedYear);
    setSelectedContestId(selectedContestId);
  };

  const showEmptyState = !isLoading && (!data?.participants.length || error);
  const hasLeader = data?.teamInformation.some((member) => member.isLeader);

  let deputyLeader = DEPUTY_LEADER;
  if (hasLeader) {
    deputyLeader = data?.teamInformation.find((member) => member.isLeader)
      ?.name as string;
  } else if (data?.teamInformation.length) {
    deputyLeader = data?.teamInformation[0].name;
  }

  return (
    <Container>
      <h2 className="text-2xl font-bold">Resultados de la delegación:</h2>

      <div className="flex flex-row gap-4">
        <label className="font-semibold">
          Año de participación:
          <select onChange={handleSelectionChange} value={selectedYear}>
            {years.map(({ year, contestId }) => (
              <option key={contestId} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        {isLoading && <ParticipantsLoader />}

        {/* TODO: Add empty state */}
        {showEmptyState && <NoResults />}
        {!isLoading && !showEmptyState && (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl">
              Lider de la delegación:{" "}
              <span className="font-semibold">{deputyLeader}</span>
            </h3>
            <h4 className="text-lg">Resultados</h4>
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
