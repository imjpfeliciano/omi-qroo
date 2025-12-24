import { getPostBySlug } from "@/lib/posts";
import Container from "@/components/Container";
import ProblemSolution from "@/components/Problems/Solution";
import Link from "next/link";

export const getMDXContent = async (slug: string, isSolution = false) => {
  const postContent = await getPostBySlug(slug, isSolution);
  const { frontmatter, content } = postContent;

  return { frontmatter, content };
};

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

interface PostHeadingProps {
  title: string;
  date: string;
  author: string;
}

const PostHeading: React.FC<PostHeadingProps> = ({ title, date, author }) => (
  <div className="flex flex-col gap-4">
    {/* Back Button */}
    <Link
      href="/problems"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 w-fit group"
    >
      <svg
        className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Volver a la lista de problemas</span>
    </Link>

    {/* Title and Metadata */}
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-wrap items-center gap-3 text-gray-600">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">{date}</span>
        </div>
        <span className="text-gray-300">•</span>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-sm">por {author}</span>
        </div>
      </div>
    </div>
  </div>
);

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter: postHeadingContent, content: problemContent } =
    await getMDXContent(slug);

  let solutionContent = null;
  if (postHeadingContent.hasSolution) {
    const { content: solution } = await getMDXContent(slug, true);
    solutionContent = solution;
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 py-6">
        {/* @ts-ignore */}
        <PostHeading {...postHeadingContent} />

        {/* Article Content Card */}
        <MaterialCard className="p-6 md:p-8">
          <div className="article-content prose prose-lg max-w-none">
            {problemContent}
            {(postHeadingContent.hasSolution as boolean) && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <ProblemSolution content={solutionContent} />
              </div>
            )}
          </div>
        </MaterialCard>
      </div>
    </Container>
  );
}
