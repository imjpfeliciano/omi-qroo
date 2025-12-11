import { getPostBySlug } from "@/lib/posts";
import Container from "@/components/Container";
import ProblemSolution from "@/components/Problems/Solution";

export const getMDXContent = async (slug: string, isSolution = false) => {
  const postContent = await getPostBySlug(slug, isSolution);
  const { frontmatter, content } = postContent;

  return { frontmatter, content };
};

interface PostHeadingProps {
  title: string;
  date: string;
  author: string;
}

const PostHeading: React.FC<PostHeadingProps> = ({ title, date, author }) => (
  <div>
    <div>
      <a href="/problems" className="text-blue-500">
        {"<"} Volver a la lista de problemas
      </a>
    </div>
    <h1 className="text-4xl font-bold">{title}</h1>
    <div className="text-gray-500">
      <span>{date}</span>
      <span> by {author}</span>
    </div>
  </div>
);

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
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
      {/* @ts-ignore */}
      <PostHeading {...postHeadingContent} />
      <div className="article-content bg-white rounded-lg !max-w-screen p-4 shadow-lg">
        {problemContent}
        {(postHeadingContent.hasSolution as boolean) && (
          <ProblemSolution content={solutionContent} />
        )}
      </div>
    </Container>
  );
}
