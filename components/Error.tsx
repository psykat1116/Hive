import { AlertTriangle } from "lucide-react";

interface ErrorProps {
  content: string;
}

const Error = ({ content }: ErrorProps) => {
  return (
    <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <AlertTriangle className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">
        {content}
      </span>
    </div>
  );
};

export default Error;
