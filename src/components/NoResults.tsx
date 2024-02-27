import NoResultsImage from "../assets/images/illustrations/undraw_no_data_re_kwbl.svg";

const NoResults = () => (
  <div className="flex flex-col gap-4 items-center justify-center">
    <img
      src={NoResultsImage.src}
      alt="No hay resultados"
      className="aspect-video w-1/2"
    />
    <div className="flex flex-col gap-4 items-center">
      <span className="text-2xl font-bold">
        No encontramos resultados para tu búsqueda
      </span>
      <p className="text-gray-500">
        Intenta cambiando el año de la competencia
      </p>
    </div>
  </div>
);

export default NoResults;
