import Container from "@/components/Container";
import OMILOGO from "../assets/images/omi-qroo-logo.png";
import ProgrammingIllustration from "../assets/images/illustrations/undraw-programming.svg";
import Link from "next/link";
import RoundedLink from "@/components/RoundedLink";

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

// Feature Card Component for page sections
const FeatureCard = ({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}) => (
  <Link href={href}>
    <MaterialCard className="p-6 h-full flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300">
      <div className="mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 text-blue-600 font-medium hover:text-blue-700 transition-colors">
        Explorar →
      </div>
    </MaterialCard>
  </Link>
);

const Home = () => (
  <Container>
    <div className="flex flex-col gap-8 py-6">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6">
        <img
          src={OMILOGO.src}
          alt="OMI Q. Roo Logo"
          className="w-2/3 max-w-md m-auto"
          width={OMILOGO.width}
          height={OMILOGO.height}
        />
      </section>

      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src={ProgrammingIllustration.src}
            alt="Programming Illustration"
            className="w-full max-w-md"
          />
        </div>
        <MaterialCard className="p-8">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              Olimpiada Mexicana de Informática
            </h1>
            <div className="flex flex-col gap-4 text-base leading-relaxed text-gray-700">
              <p>
                La{" "}
                <span className="font-semibold text-gray-900">
                  Olimpiada Mexicana de Informática (OMI)
                </span>{" "}
                es un concurso a nivel nacional para jóvenes con facilidad para
                resolver problemas prácticos mediante la lógica y el uso de
                computadoras, que busca promover el desarrollo tecnológico en
                México y encontrar a los mejores programadores, quienes formarán
                la selección mexicana para participar en las próximas{" "}
                <span className="font-semibold text-gray-900">
                  Olimpiadas Internacionales de Informática (IOI).
                </span>
              </p>
              <p>
                La OMI es un concurso en el que sobre todo se requiere tener
                facilidad, habilidad y voluntad de resolver problemas,
                utilizando la lógica, el ingenio y las computadoras.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="http://olimpiadadeinformatica.org.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Conocer más sobre OMI
              </a>
            </div>
          </div>
        </MaterialCard>
      </section>

      {/* Features Section - Other Pages */}
      <section className="flex flex-col gap-6">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Explora nuestro sitio
          </h2>
          <p className="text-gray-600 text-lg">
            Descubre recursos, problemas y resultados de la delegación
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Resultados"
            description="Consulta los resultados históricos de la delegación de Quintana Roo en las Olimpiadas Nacionales de Informática. Explora los logros de nuestros participantes año tras año."
            href="/results"
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            }
          />
          <FeatureCard
            title="Problemas"
            description="Accede a una colección curada de problemas de programación competitiva ordenados por nivel de complejidad, con soluciones detalladas y explicaciones paso a paso."
            href="/problems"
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            }
          />
          <FeatureCard
            title="Recursos"
            description="Encuentra plataformas de práctica recomendadas, libros de algoritmos y estructuras de datos, y otros recursos útiles para mejorar tus habilidades en programación competitiva."
            href="/resources"
            icon={
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
          />
        </div>
      </section>

      {/* Social Media Section */}
      <section className="flex flex-col gap-6 items-center">
        <MaterialCard className="p-8 w-full max-w-2xl">
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Sigue a la OMI-Q.Roo en sus redes sociales
            </h2>
            <p className="text-gray-600">
              Mantente al día con las últimas noticias, eventos y
              actualizaciones de la delegación
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
              <RoundedLink
                href="https://www.facebook.com/coiteqmx/"
                icon="facebook"
                label="Facebook Oficial"
              />
              <RoundedLink
                href="https://www.facebook.com/omiqroo/"
                icon="community"
                label="Comunidad Ex-Olímpicos"
              />
            </div>
          </div>
        </MaterialCard>
      </section>
    </div>
  </Container>
);

export default Home;
