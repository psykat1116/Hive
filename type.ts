import { Id } from "@/convex/_generated/dataModel";

export const BATCH_SIZE = 20;
export const TIME_THRESHOLD = 5;

export type SignInFlow = "signIn" | "signUp";

export type W_ResponseType = Id<"workspaces">;
export type M_ResponseType = Id<"messages">;
export type ME_ResponseType = Id<"members">;
export type CH_ResponseType = Id<"channels">;
export type C_ResponseType = Id<"conversations">;
export type R_ResponseType = Id<"reactions">;

export type W_J_RequestType = {
  joinCode: string;
  workspaceId: Id<"workspaces">;
};
export type W_C_RequestType = { name: string };
export type W_R_RequestType = { id: Id<"workspaces"> };
export type W_N_RequestType = { workspaceId: Id<"workspaces"> };
export type W_U_RequestType = { id: Id<"workspaces">; name: string };

export type M_C_RequestType = {
  body: string;
  image?: Id<"_storage">;
  workspaceId: Id<"workspaces">;
  channelId?: Id<"channels">;
  parentMessageId?: Id<"messages">;
  conversationId?: Id<"conversations">;
};

export type R_T_RequestType = { value: string; messageId: Id<"messages"> };

export type M_R_RequestType = { id: Id<"messages"> };
export type M_U_RequestType = { body: string; id: Id<"messages"> };

export type Me_R_RequestType = { id: Id<"members"> };
export type Me_U_RequestType = { id: Id<"members">; role: "admin" | "member" };

export type CH_R_RequestType = { id: Id<"channels"> };
export type CH_C_RequestType = { name: string; workspaceId: Id<"workspaces"> };
export type CH_U_RequestType = { channelId: Id<"channels">; name: string };

export type C_C_OR_G_RequestType = {
  memberId: Id<"members">;
  workspaceId: Id<"workspaces">;
};

export type W_Options = {
  onSuccess?: (data: W_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type M_Options = {
  onSuccess?: (data: M_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type ME_Options = {
  onSuccess?: (data: ME_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type CH_Options = {
  onSuccess?: (data: CH_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type C_Options = {
  onSuccess?: (data: C_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type R_Options = {
  onSuccess?: (data: R_ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export type Upload_Options = {
  onSuccess?: (data: string) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};
