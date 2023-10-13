// import { chromium } from "playwright";
import cheerio from "cheerio";
import axios from "axios";

const getValue = (row: string | null) => {
  if (!row) return null;
  const $ = cheerio.load(row);
  return $.text().trim();
}

interface OmiParticipant {
  ioi: boolean;
  standing: string | null;
  genre: string | null;
  name: string | null;
  participantId: string | null;
  points: string | null;
  medal: string | null;
  school: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contestId = searchParams.get("contestId");

  const html = await axios.get(`https://www.olimpiadadeinformatica.org.mx/Resultados/Olimpiada/Resultados?clave=${contestId}`);
  const content = html.data;

  // Get the first table in the content
  // @ts-ignore
  const table: string = content.match(/<table.*?>([\s\S]*?)<\/table>/)[0];

  // get all rows in the table that contains <span>ROO-
  // @ts-ignore
  const rows = table.match(/<tr.*?>([\s\S]*?)<\/tr>/g).filter((row) => row.includes("<span>ROO-"));

  const participants: OmiParticipant[] = [];

  // map each row to an object
  rows.forEach((row, index) => {
    // split each row by td
    const splittedRow = row.match(/<td.*?>([\s\S]*?)<\/td>/g);
    if (splittedRow) {
      const $ = cheerio.load(row);

      const newParticipant: OmiParticipant = {
        ioi: Boolean(splittedRow[0].includes('stats.ioinformatics.org/people/')),
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

  return new Response(JSON.stringify({ message: "Hello world", contestId, participants }), {
    headers: { "content-type": "application/json" },
  });
}
