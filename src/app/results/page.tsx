const participants = [
  {
    id: "ROO-1",
    fullName: "Juan",
    medal: "Oro",
    school: "Escuela 1",
  },
  {
    id: "ROO-2",
    fullName: "Pedro",
    medal: "Plata",
    school: "Escuela 2",
  },
];

export default function Results() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Resultados de la delegación</h2>

      <div className="flex flex-row gap-4">
        <div>Año de participacion</div>
        <div>Categoría</div>
      </div>

      <div>
        <h3 className="text-xl">Lider de la delegación</h3>
        <h4 className="text-lg">Nombre</h4>
      </div>

      <div>
        <h4 className="text-lg">Resultados</h4>

        <div className="flex flex-col">
          {participants.map((participant) => (
            <div className="flex flex-col gap-4" key={participant.id}>
              <div className="flex flex-row gap-4">
                <div>{participant.id}</div>
                <div>{participant.fullName}</div>
                <div>{participant.medal}</div>
                <div>{participant.school}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
