import { getSortedPostsData } from "@/lib/posts";
import Container from "@/components/Container";
import Link from "next/link";

// Material Design Card Component
const MaterialCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out ${className}`}
  >
    {children}
  </div>
);

// Complexity badge colors
const getComplexityColor = (complexity: string | undefined) => {
  if (!complexity) {
    return "bg-gray-100 text-gray-800";
  }
  const complexityLower = complexity.toLowerCase();
  if (complexityLower === "fácil" || complexityLower === "easy") {
    return "bg-green-100 text-green-800";
  } else if (
    complexityLower === "medio" ||
    complexityLower === "medium" ||
    complexityLower === "intermedio"
  ) {
    return "bg-yellow-100 text-yellow-800";
  } else if (
    complexityLower === "difícil" ||
    complexityLower === "hard" ||
    complexityLower === "difícil"
  ) {
    return "bg-red-100 text-red-800";
  }
  return "bg-gray-100 text-gray-800";
};

// Problem Card Component
const ProblemCard = ({ post }: { post: any }) => (
  <Link href={`/problems/${post.slug}`}>
    <MaterialCard className="p-6 h-full flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 group">
      <div className="flex flex-col gap-4 flex-grow">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 flex-grow">
            {post.title}
          </h3>
          {post.hasSolution && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600 capitalize">
            {post.topics[0]}
          </span>
          <span className="text-gray-300">•</span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getComplexityColor(
              post.complexity
            )}`}
          >
            {post.complexity}
          </span>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
            <span>Ver problema</span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </MaterialCard>
  </Link>
);

export const getPosts = async () => {
  const allPostsData = await getSortedPostsData();
  return allPostsData;
};

export default async function Page() {
  const allPostsData = await getPosts();

  return (
    <Container>
      <div className="flex flex-col gap-8 py-6">
        {/* Page Header */}
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Problemas recomendados
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            En esta sección encontrarás una recopilación de problemas propuestos
            ordenados por nivel de complejidad y la explicación de las
            soluciones propuestas para los mismos
          </p>
        </section>

        {/* Problems Grid */}
        <section>
          {allPostsData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPostsData.map((post) => (
                <ProblemCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <MaterialCard className="p-12 text-center">
              <p className="text-gray-600 text-lg">
                No hay problemas disponibles en este momento.
              </p>
            </MaterialCard>
          )}
        </section>
      </div>
    </Container>
  );
}
