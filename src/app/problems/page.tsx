import { getSortedPostsData } from "@/lib/posts";
import Container from "@/components/Container";

export const getPosts = async () => {
  const allPostsData = await getSortedPostsData();
  return allPostsData;
};

export default async function Page() {
  const allPostsData = await getPosts();

  return (
    <Container>
      <h3 className="text-2xl font-bold">Problemas recomendados</h3>
      <div>
        En esta sección encontrarás una recopilación de problemas propuestos
        ordenados por nivel de complejidad y la explicación de las soluciones
        propuestas para los mismos
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Problema
              </th>
              <th scope="col" className="px-6 py-3">
                Categoría
              </th>
              <th scope="col" className="px-6 py-3">
                Complejidad
              </th>
              <th scope="col" className="px-6 py-3">
                Solución disponible
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Ver problema</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {allPostsData.map((post) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={post.slug}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.title}
                </th>
                <td className="px-6 py-4 capitalize">{post.topics[0]}</td>
                <td className="px-6 py-4 capitalize">{post.complexity}</td>
                <td className="px-6 py-4 text-center">
                  {post.hasSolution ? "✅" : "❌"}
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href={`/problems/${post.slug}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Ver problema
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}
