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