import Container from "@/components/Container";

interface OnlinePlatform {
  name: string;
  url: string;
  logo?: string;
}
const Platforms: OnlinePlatform[] = [
  {
    name: "omegaUp",
    logo: "https://omegaup.com/media/omegaup_curves.png",
    url: "https://omegaup.com/",
  },
  {
    name: "Codeforces",
    logo: "https://codeforces.org/s/13931/images/codeforces-sponsored-by-ton.png",
    url: "https://codeforces.com/",
  },
  {
    name: "UVa Online Judge",
    logo: "https://onlinejudge.org/templates/hm_yaml_2_5/img/ojlogo2.svg.png",
    url: "https://onlinejudge.org/",
  },
  {
    name: "HackerRank",
    logo: "https://www.hackerrank.com/wp-content/uploads/2018/08/hackerrank_logo.png",
    url: "https://www.hackerrank.com/",
  },
  {
    name: "LeetCode",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/LeetCode_Logo_black_with_text.svg/1024px-LeetCode_Logo_black_with_text.svg.png",
    url: "https://leetcode.com",
  },
];

interface Book {
  title: string;
  referenceUrl: string;
  author: string;
  cover: string;
}

const Books: Book[] = [
  {
    title: "Problemas y Algoritmos",
    referenceUrl: "https://omegaup.com/docs/assets/libroluisvargas.pdf",
    author: "Luis Vargas",
    cover:
      "https://image.isu.pub/150424183734-f415ee6ff79f80d27ca2df858acc60f1/jpg/page_1.jpg",
  },
  {
    title: "The Algorithm Design Manual",
    referenceUrl: "http://www.algorist.com/",
    author: "Steven S. Skiena",
    cover:
      "https://media.springernature.com/full/springer-static/cover-hires/book/978-1-84800-070-4",
  },
  {
    title: "Competitive Programming 3",
    referenceUrl: "https://cpbook.net/",
    author: "Steven Halim",
    cover: "https://cpbook.net/img/cp3.png",
  },
  {
    title: "Competitive Programmer's Handbook",
    referenceUrl: "https://cses.fi/book/index.html",
    author: "Antti Laaksonen",
    cover:
      "https://assets.lulu.com/cover_thumbs/1/r/1rvgd27k-front-shortedge-384.jpg",
  },
  {
    title: "Introduction to Algorithms",
    referenceUrl:
      "https://mitpress.mit.edu/books/introduction-algorithms-third-edition",
    author:
      "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
    cover:
      "https://www.interviewbit.com/blog/wp-content/uploads/2022/02/Introduction-to-Algorithms.jpg",
  },
];

const PlatformResourceItem = ({
  platform,
}: {
  platform: Record<string, any>;
}) => (
  <a
    href={platform.url}
    className="bg-white shadow-lg p-4 flex flex-col items-center justify-center gap-2 hover:scale-105 transition-all duration-150 ease-out aspect-video"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={platform.logo} alt={platform.name} />
  </a>
);

const BookItem = ({ book }: { book: Book }) => (
  <div key={book.referenceUrl} className="flex flex-col items-center gap-4">
    <img
      src={book.cover}
      alt={book.title}
      className="w-full p-4 aspect-[6/9] hover:scale-105 transition-all duration-150 ease-out overflow-clip"
    />

    <a href={book.referenceUrl} target="_blank" rel="noreferrer" className="">
      <h4 className="font-semibold min-h-[50px] hover:text-blue-500">
        {book.title}
      </h4>
    </a>
  </div>
);

const ResourcesPage = () => (
  <Container>
    <div className="flex flex-col gap-4 mt-2">
      <section className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">Plataformas recomendadas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          {Platforms.map((platform) => (
            <PlatformResourceItem key={platform.url} platform={platform} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Libros recomendados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Books.map((book) => (
            <BookItem key={book.referenceUrl} book={book} />
          ))}
        </div>
      </section>
    </div>
  </Container>
);

export default ResourcesPage;
