import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  description?: string;
  size?: number;
  Tclass?: string;
  Dclass?: string;
}

const Header = ({
  title = "Hive",
  description = "Your all-in-one workspace for managing your projects",
  size = 40,
  Tclass,
  Dclass,
}: HeaderProps) => {
  return (
    <div className="flex items-center justify-start gap-3 w-full">
      <Image src="/logo.svg" alt="Logo" width={size} height={size} />
      <div>
        <h1 className={cn("font-bold text-xl", Tclass)}>{title}</h1>
        <p className={cn("text-xs text-muted-foreground", Dclass)}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Header;
