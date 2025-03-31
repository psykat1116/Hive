import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { Id } from "./_generated/dataModel";
import { mutation, QueryCtx } from "./_generated/server";

const getMember = async (
  ctx: QueryCtx,
  userId: Id<"users">,
  workspaceId: Id<"workspaces">
) => {
  return ctx.db
    .query("members")
    .withIndex("by_workspace_id_user_id", (q) =>
      q.eq("workspaceId", workspaceId).eq("userId", userId)
    )
    .unique();
};

export const toggle = mutation({
  args: { value: v.string(), messageId: v.id("messages") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const message = await ctx.db.get(args.messageId);
    if (!message) {
      throw new Error("Message not found");
    }

    const member = await getMember(ctx, userId, message.workspaceId);
    if (!member) {
      throw new Error("Member not found");
    }

    const existingReaction = await ctx.db
      .query("reactions")
      .filter((q) =>
        q.and(
          q.eq(q.field("messageId"), args.messageId),
          q.eq(q.field("memberId"), member._id),
          q.eq(q.field("value"), args.value)
        )
      )
      .first();

    if (existingReaction) {
      await ctx.db.delete(existingReaction._id);
      return existingReaction._id;
    } else {
      const reaction = await ctx.db.insert("reactions", {
        value: args.value,
        memberId: member._id,
        messageId: args.messageId,
        workspaceId: message.workspaceId,
      });
      return reaction;
    }
  },
});
