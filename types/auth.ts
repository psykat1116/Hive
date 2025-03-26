import { Id } from "@/convex/_generated/dataModel";

export type SignInFlow = "signIn" | "signUp";

export type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type RequestType =
  | { id: Id<"workspaces">; name: string }
  | { name: string }
  | { id: Id<"workspaces"> };
export type ResponseType = Id<"workspaces">;
