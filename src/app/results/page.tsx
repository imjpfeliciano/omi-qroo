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

// Material Design Card Component with proper elevation
const MaterialCard = ({
  children,
  className = "",
  elevation = 2,
}: {
  children: React.ReactNode;
  className?: string;
  elevation?: 1 | 2 | 4 | 8;
}) => {
  const elevationClasses = {
    1: "shadow-sm",
    2: "shadow-md",
    4: "shadow-lg",
    8: "shadow-xl",
  };

  return (
    <div
      className={`bg-white rounded-lg ${elevationClasses[elevation]} hover:shadow-lg transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

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
      <div className="flex flex-col gap-8 py-6">
        {/* Hero Section with Description */}
        <section className="flex flex-col gap-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-medium text-gray-900 mb-4 tracking-tight">
              Resultados de la Delegación
            </h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explora los resultados históricos de la delegación de Quintana Roo
              en las{" "}
              <span className="font-medium text-gray-900">
                Olimpiadas Nacionales de Informática
              </span>
              . Consulta los logros, medallas y posiciones de nuestros
              participantes año tras año, y conoce a los líderes que han guiado
              nuestra delegación hacia el éxito.
            </p>
          </div>
        </section>

        {/* Year Selector Section */}
        <section>
          <MaterialCard className="p-6" elevation={2}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label className="text-base font-medium text-gray-700 flex-shrink-0">
                Año de participación:
              </label>
              <div className="flex-1 relative">
                <select
                  onChange={handleSelectionChange}
                  value={selectedYear}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 font-medium text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-gray-400 cursor-pointer appearance-none pr-10"
                >
                  {years.map(({ year, contestId }) => (
                    <option key={contestId} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </MaterialCard>
        </section>

        {/* Results Content Section */}
        <section>
          {isLoading && <ParticipantsLoader />}

          {showEmptyState && <NoResults />}

          {!isLoading && !showEmptyState && (
            <div className="flex flex-col gap-6">
              {/* Leader Information Card */}
              <MaterialCard className="p-6" elevation={2}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-xl font-medium text-gray-900">
                      Líder de la Delegación
                    </h2>
                  </div>
                  <div className="pl-14">
                    <p className="text-lg font-medium text-gray-900">
                      {deputyLeader}
                    </p>
                  </div>
                </div>
              </MaterialCard>

              {/* Participants Results */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 pb-2">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900">
                    Resultados de los Participantes
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {data?.participants.map((participant) => (
                    <ParticipantCard
                      key={participant.participantId}
                      {...participant}
                    />
                  ))}
                </div>
              </div>

              {/* Illustration */}
              <div className="flex justify-center mt-6">
                <img
                  src={ResultsIllustration.src}
                  alt="Ilustración de resultados"
                  className="w-full max-w-md"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
