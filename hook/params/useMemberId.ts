"use client";
import { useParams } from "next/navigation";

import { Id } from "@/convex/_generated/dataModel";

export const useMemberId = () => {
  const { memberId } = useParams();
  return memberId as Id<"members">;
};
