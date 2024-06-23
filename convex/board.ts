import { v } from 'convex/values';
import { mutation } from './_generated/server';

const images: string[] = [
    "/placeholders/placeholder-1.svg",
    "/placeholders/placeholder-2.svg",
    "/placeholders/placeholder-3.svg",
    "/placeholders/placeholder-4.svg",
    "/placeholders/placeholder-5.svg",
    "/placeholders/placeholder-6.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string()
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();

        if(!identify) {
            throw new Error("Unauthorized");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const board = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identify.subject,
            authorName: identify.name!,
            imageUrl: randomImage!
        });

        return board;
    }
})

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string()
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        
        if(!identify) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if(!title) {
            throw new Error("Title is required");
        }
        if(title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters");
        }

        const board = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return board;
    }
})

export const favorite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if(!identify) {
            throw new Error("Unauthorized");
        }
        
        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found")
        }

        const userId = identify.subject;
        
        const existingFavorite = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) => 
            q
              .eq("userId", userId)
              .eq("boardId", board._id)
          )
          .unique();

        if(existingFavorite) {
            throw new Error("Board already favorited")
        }

        await ctx.db.insert("userFavorites", {
            userId,
            boardId: board._id,
            orgId: board.orgId
        });

        return board;
    }
})

export const unfavorite = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();
        if(!identify) {
            throw new Error("Unauthorized");
        }
        
        const board = await ctx.db.get(args.id);
        if(!board){
            throw new Error("Board not found")
        }

        const userId = identify.subject;
        
        const existingFavorite = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) => 
            q
              .eq("userId", userId)
              .eq("boardId", board._id)
          )
          .unique();

        if(!existingFavorite) {
            throw new Error("Favorited board not found")
        }

        await ctx.db.delete(existingFavorite._id)

        return board;
    }
})

export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();

        if(!identify) {
            throw new Error("Unauthorized");
        }

        const userId = identify.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_board", (q) => 
                q
                  .eq("userId", userId)
                  .eq("boardId", args.id)
            )
            .unique();

        if(existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }
        
        const board = await ctx.db.delete(args.id);

        return board;
    }
})