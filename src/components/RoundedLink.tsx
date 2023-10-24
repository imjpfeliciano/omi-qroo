import FacebookLogo from "../assets/images/svg/facebook-round.svg";
import CommunityLogo from "../assets/images/svg/community-round.svg";

type Icon = "facebook" | "community";

interface RoundedLinkProps {
  href: string;
  label: string;
  icon: Icon;
}

const icons = {
  facebook: FacebookLogo,
  community: CommunityLogo,
};

const RoundedLink: React.FC<RoundedLinkProps> = ({ href, label, icon }) => {
  const Icon = icons[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row gap-2 justify-center items-center bg-blue-600 text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded-full pr-2 w-full md:max-w-[300px] text-md"
    >
      <span>{label}</span>
      <img
        src={Icon.src}
        alt="Facebook Logo"
        width={Icon.width}
        height={Icon.height}
        className="w-10 h-10 fill-white"
      />
    </a>
  );
};

export default RoundedLink;
