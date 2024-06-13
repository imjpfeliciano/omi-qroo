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

      {allPostsData.map((post) => (
        <div key={post.id}>
          <a href={`/problems/${post.id}`} className="text-blue-500">
            <h4 className="font-semibold">{post.title}</h4>
          </a>
          <div>{post.publishedAt}</div>
        </div>
      ))}
    </Container>
  );
}
