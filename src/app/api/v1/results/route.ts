import { load } from "cheerio";
import axios from "axios";

const getValue = (row: string | null) => {
  if (!row) return null;
  const $ = load(row);
  return $.text().trim();
};

const getParticipantsForContest = async (contestId: string) => {
  try {
    const html = await axios.get(
      `https://www.olimpiadadeinformatica.org.mx/Resultados/Olimpiada/Resultados?clave=${contestId}`
    );
    const content = html.data;

    // Get the first table in the content
    // @ts-ignore
    const table: string = content.match(/<table.*?>([\s\S]*?)<\/table>/)[0];

    // get all rows in the table that contains <span>ROO-
    // @ts-ignore
    const rows = table
      .match(/<tr.*?>([\s\S]*?)<\/tr>/g)
      .filter(
        (row) => row.includes("<span>ROO-") || row.includes("<span>QIR-")
      );

    const participants: OmiParticipant[] = [];

    rows.forEach((row) => {
      const splittedRow = row.match(/<td.*?>([\s\S]*?)<\/td>/g);
      if (splittedRow) {
        const $ = load(row);

        const newParticipant: OmiParticipant = {
          ioi: Boolean(
            splittedRow[0].includes("stats.ioinformatics.org/people/")
          ),
          standing: getValue(splittedRow[1]),
          genre: getValue(splittedRow[2]),
          name: getValue(splittedRow[3]),
          participantId: getValue(splittedRow[4]),

          points: getValue(splittedRow[splittedRow.length - 3]),
          medal: getValue(splittedRow[splittedRow.length - 2]),
          school: getValue(splittedRow[splittedRow.length - 1]),
        };

        participants.push(newParticipant);
      }
    });

    return participants;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

const getTeamInformationForContest = async (contestId: string) => {
  try {
    const html = await axios.get(
      `https://www.olimpiadadeinformatica.org.mx/Resultados/Olimpiada/Delegacion?estado=QIR&clave=${contestId}`
    );

    const content = html.data;

    const hasLeaders = content.includes('<div class="subtitulo">Líderes</div>');

    if (hasLeaders) {
      const $ = load(content);
      const leaderDiv = $('.subtitulo:contains("Líderes")');
      const nextDivWithTablaDelegacion = leaderDiv
        .nextAll(".tablaDelegacion")
        .first();
      const nextDivContent = nextDivWithTablaDelegacion.html();

      const $nextDiv = load(nextDivContent as string);
      const members = $nextDiv(".miembroDelegacion .datosMiembro")
        .toArray()
        .map((element) => {
          const memberContent = $(element);
          const name = memberContent.find(".nombreMiembro").text();
          const isLeader = memberContent
            .find(".claveMiembro")
            .text()
            .includes("LIDER");
          return { name, isLeader };
        });

      return members;
    }

    return [];
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contestId = searchParams.get("contestId");

  try {
    const [participants, teamInformation] = await Promise.all([
      getParticipantsForContest(contestId as string),
      getTeamInformationForContest(contestId as string),
    ]);

    console.log({ participants, teamInformation });

    return Response.json({
      contestId,
      participants,
      teamInformation,
    });
  } catch (error) {
    return Response.json({
      message: "Error fetching data",
      contestId,
      participants: [],
    });
  }
}
