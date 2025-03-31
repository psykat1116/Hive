import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Image
        src="/logo.svg"
        alt="logo"
        height={20}
        width={20}
        className="animate-pulse"
      />
    </div>
  );
};

export default Loading;
