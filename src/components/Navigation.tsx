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
    className="font-semibold hover:underline text-gray-500 hover:text-white"
  >
    {children}
  </Link>
);

const Navigation = () => (
  <div className="flex flex-row justify-center items-center gap-4 bg-gray-500 m-auto  py-2">
    <div className="flex flex-row justify-between max-w-screen-md w-full">
      <div className="flex flex-row gap-2">
        <NavigationLink href="/">Inicio</NavigationLink>
        <NavigationLink href="/results">Resultados</NavigationLink>
        <NavigationLink href="/resources">Recursos</NavigationLink>
      </div>
      <div className="text-white">Media Icons</div>
    </div>
  </div>
);

export default Navigation;
