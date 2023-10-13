import { chromium } from "playwright";
import cheerio from "cheerio";

const getValue = (row: string | null) => {
  if (!row) return null;
  const $ = cheerio.load(row);
  return $.text().trim();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const contestId = searchParams.get("contestId");

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.olimpiadadeinformatica.org.mx/Resultados/Olimpiada/Resultados?clave=${contestId}`);

  const content = await page.content();

  // Get the first table in the content
  const table = content.match(/<table.*?>([\s\S]*?)<\/table>/)[0];

  // get all rows in the table that contains <span>ROO-
  const rows = table.match(/<tr.*?>([\s\S]*?)<\/tr>/g).filter((row) => row.includes("<span>ROO-"));

  const participants = [];

  // map each row to an object
  rows.forEach((row, index) => {
    // split each row by td
    const splittedRow = row.match(/<td.*?>([\s\S]*?)<\/td>/g);

    const $ = cheerio.load(row);

    const newParticipant = {
      ioi: splittedRow[0].includes('stats.ioinformatics.org/people/'),
      standing: getValue(splittedRow[1]),
      genre: getValue(splittedRow[2]),
      name: getValue(splittedRow[3]),
      participantId: getValue(splittedRow[4]),
      points: getValue(splittedRow[15]),
      medal: getValue(splittedRow[16]),
      school: getValue(splittedRow[17]),
    };

    participants.push(newParticipant);
  });


  // Close the browser
  await browser.close();

  return new Response(JSON.stringify({ message: "Hello world", contestId, participants, rows }), {
    headers: { "content-type": "application/json" },
  });
}
