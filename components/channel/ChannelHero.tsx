import Image from "next/image";
import { format } from "date-fns";

interface ChannelHeroProps {
  name: string;
  creationTime: number;
}

const ChannelHero = ({ name, creationTime }: ChannelHeroProps) => {
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <Image
        src="/logo.svg"
        alt="Logo"
        height={40}
        width={40}
        className="mb-2"
      />
      <p className="text-2xl font-bold flex items-center"># {name}</p>
      <p className="font-normal text-slate-800">
        This Channel Was Created On{" "}
        {format(new Date(creationTime), "MMMM do, yyyy")}. This is the very
        begining of the <strong>{name}</strong> channel.
      </p>
    </div>
  );
};

export default ChannelHero;
