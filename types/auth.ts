import { Id } from "@/convex/_generated/dataModel";

export type SignInFlow = "signIn" | "signUp";

export type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type Requestype = { name: string };
export type ResponseType = Id<"workspaces">;
