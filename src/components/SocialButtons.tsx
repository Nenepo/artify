import Image from "next/image";

const SocialButtons = ({
  icon,
  text,
  action,
}: {
  icon: string;
  text: string;
  action?: () => void;
}) => {
  return (
    <button
      className="px-4 py-2.5 bg-white/10 flex rounded-lg gap-4 items-center w-full h-12 justify-center cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-md group"
      onClick={action}
    >
      <Image src={icon} width={20} height={20} alt={`${text} icon`} className="transition-transform duration-300 group-hover:scale-110" />
      <span className="font-normal text-base text-white">{text}</span>
    </button>
  );
};

export default SocialButtons;