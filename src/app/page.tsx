import OMILOGO from "../assets/images/omi-qroo-logo.png";

const Home = () => (
  <div className="flex flex-col gap-4 max-w-screen-lg">
    <img src={OMILOGO.src} alt="OMI Q. Roo Logo" className="w-2/3 m-auto" />
    <article className="flex flex-col gap-2 text-lg font-light">
      <p>
        La{" "}
        <span className="font-semibold">
          Olimpiada Mexicana de Informática (OMI)
        </span>{" "}
        es un concurso a nivel nacional para jóvenes con facilidad para resolver
        problemas prácticos mediante la lógica y el uso de computadoras, que
        busca promover el desarrollo tecnológico en México y encontrar a los
        mejores programadores, quienes formarán la selección mexicana para
        participar en las próximas Olimpiadas Internacionales de Informática
        (IOI).
      </p>
      <p>
        La OMI es un concurso en el que sobre todo se requiere tener facilidad,
        habilidad y voluntad de resolver problemas, utilizando la lógica, el
        ingenio y las computadoras.
      </p>

      <a
        href="http://olimpiadadeinformatica.org.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="bg-blue-600 text-white font-semibold rounded p-2 hover:bg-blue-700">
          Ver más
        </button>
      </a>
    </article>
  </div>
);

export default Home;
