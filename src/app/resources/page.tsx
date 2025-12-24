import Container from "@/components/Container";

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

const PlatformResourceItem = ({ platform }: { platform: OnlinePlatform }) => (
  <a
    href={platform.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block h-full"
  >
    <MaterialCard className="p-6 h-full flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src={platform.logo}
          alt={platform.name}
          className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h4 className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-200 text-center">
        {platform.name}
      </h4>
    </MaterialCard>
  </a>
);

const BookItem = ({ book }: { book: Book }) => (
  <a
    href={book.referenceUrl}
    target="_blank"
    rel="noreferrer"
    className="block h-full"
  >
    <MaterialCard className="p-4 h-full flex flex-col gap-4 hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
        <img
          src={book.cover}
          alt={book.title}
          className="w-full aspect-[6/9] object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {book.title}
        </h4>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>
    </MaterialCard>
  </a>
);

const ResourcesPage = () => (
  <Container>
    <div className="flex flex-col gap-8 py-6">
      {/* Page Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Recursos de Estudio
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explora nuestra colección curada de plataformas de práctica y libros
          recomendados para mejorar tus habilidades en programación competitiva.
        </p>
      </section>

      {/* Platforms Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Plataformas de Práctica
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Plataformas en línea donde puedes resolver problemas de programación
            competitiva, participar en concursos y mejorar tus habilidades
            algorítmicas. Estas plataformas ofrecen problemas de diferentes
            niveles de dificultad y sistemas de evaluación automática.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Platforms.map((platform) => (
            <PlatformResourceItem key={platform.url} platform={platform} />
          ))}
        </div>
      </section>

      {/* Books Section */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Libros Recomendados
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Libros esenciales sobre algoritmos, estructuras de datos y
            programación competitiva. Estos recursos cubren desde conceptos
            fundamentales hasta técnicas avanzadas utilizadas en competencias
            internacionales.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Books.map((book) => (
            <BookItem key={book.referenceUrl} book={book} />
          ))}
        </div>
      </section>
    </div>
  </Container>
);

export default ResourcesPage;
