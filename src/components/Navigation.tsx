import Link from "next/link";

const NavigationLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="font-semibold hover:underline hover:text-gray-500 text-white"
  >
    {children}
  </Link>
);

const Navigation = () => (
  <div className="flex flex-row justify-center items-center gap-4 bg-gray-700 m-auto  py-4">
    <div className="flex flex-row justify-between max-w-screen-lg w-full">
      <div className="flex flex-row gap-4">
        <NavigationLink href="/">Inicio</NavigationLink>
        <NavigationLink href="/results">Resultados</NavigationLink>
        {/* <NavigationLink href="/resources">Recursos</NavigationLink> */}
      </div>
      {/* <div className="text-white">Media Icons</div> */}
    </div>
  </div>
);

export default Navigation;
