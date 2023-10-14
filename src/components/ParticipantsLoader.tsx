const SingleParticipantLoader = () => (
  <div className="bg-white w-full shadow-lg grid grid-cols-5 p-4 rounded items-center max-h-[64px]">
    {/* id */}
    <div className="bg-gray-300 w-2/3 h-4 animate-pulse rounded"></div>

    {/* medal */}

    <div className="bg-gray-300 w-10 h-10 animate-pulse rounded-full"></div>

    {/* name */}
    <div className="col-span-2 bg-gray-300 w-2/3 h-4 animate-pulse rounded"></div>

    {/* school */}
    <div className="bg-gray-300 w-1/2 h-4 animate-pulse rounded"></div>
  </div>
);

const ParticipantsLoader = () => (
  <div className="flex flex-col items-center justify-center gap-2">
    <SingleParticipantLoader />
    <SingleParticipantLoader />
    <SingleParticipantLoader />
    <SingleParticipantLoader />
  </div>
);

export default ParticipantsLoader;
