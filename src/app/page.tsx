import Container from "@/components/Container";
import OMILOGO from "../assets/images/omi-qroo-logo.png";
import ProgrammingIllustration from "../assets/images/illustrations/undraw-programming.svg";

import RoundedLink from "@/components/RoundedLink";

const Home = () => (
  <Container>
    <div className="flex flex-col gap-4">
      <img
        src={OMILOGO.src}
        alt="OMI Q. Roo Logo"
        className="w-2/3 m-auto"
        width={OMILOGO.width}
        height={OMILOGO.height}
      />
      <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {/* NOTE: Illustrations are using tailwind blue-500 */}
          <img
            src={ProgrammingIllustration.src}
            alt="Programming Illustration"
          />
        </div>
        <div className="flex flex-col gap-2 text-lg font-light justify-center items-center text-center">
          <p>
            La{" "}
            <span className="font-semibold">
              Olimpiada Mexicana de Informática (OMI)
            </span>{" "}
            es un concurso a nivel nacional para jóvenes con facilidad para
            resolver problemas prácticos mediante la lógica y el uso de
            computadoras, que busca promover el desarrollo tecnológico en México
            y encontrar a los mejores programadores, quienes formarán la
            selección mexicana para participar en las próximas{" "}
            <span className="font-semibold">
              Olimpiadas Internacionales de Informática (IOI).
            </span>
          </p>
          <p>
            La OMI es un concurso en el que sobre todo se requiere tener
            facilidad, habilidad y voluntad de resolver problemas, utilizando la
            lógica, el ingenio y las computadoras.
          </p>

          <div className="flex w-full md:inline-block">
            <a
              href="http://olimpiadadeinformatica.org.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-blue-600 text-white font-semibold p-2 hover:bg-blue-700 rounded-full px-4 py-2"
            >
              Ver más
            </a>
          </div>
        </div>
      </article>

      <article className="flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Sigue a la OMI-Q.Roo en sus redes sociales.
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          <RoundedLink
            href="https://www.facebook.com/coiteqmx/"
            icon="facebook"
            label="Facebook Oficial"
          />
          <RoundedLink
            href="https://www.facebook.com/omiqroo/"
            icon="community"
            label="Comunidad Ex-Olímpicos"
          />
        </div>
      </article>
    </div>
  </Container>
);

export default Home;
