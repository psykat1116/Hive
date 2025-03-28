import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

const ConversationHero = ({
  name = "Member",
  image,
}: ConversationHeroProps) => {
  const fallBack = name[0].toUpperCase();
  return (
    <div className="mt-[88px] mx-5 mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <Avatar className="size-14 mr-2">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{fallBack}</AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <p className="font-normal text-slate-800">
        This Conversation Is Just Between You And <strong>{name}</strong>.
      </p>
    </div>
  );
};

export default ConversationHero;
