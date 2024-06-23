import { v } from 'convex/values';
import { query } from './_generated/server';
import { getAllOrThrow } from 'convex-helpers/server/relationships'
import { Search } from 'lucide-react';

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favoraites: v.optional(v.string())
    },
    handler: async(ctx, args) => {
        const identify = await ctx.auth.getUserIdentity();

        if(!identify) {
            throw new Error("Unauthorized");
        }

        if(args.favoraites) {
            const favoritedBoards = await ctx.db
                .query("userFavorites")
                .withIndex("by_user_org", (q) => 
                    q
                      .eq("userId", identify.subject)
                      .eq("orgId", args.orgId)
                )
                .order("desc")
                .collect();
            
            const ids = favoritedBoards.map((b) => b.boardId);
            const boards = await getAllOrThrow(ctx.db, ids);

            return boards.map(board => ({
                ...board,
                isFavorite: true
            }))
        }

        const searchTitle = args.search as string;
        let boards = []

        if(searchTitle) {
            boards = await ctx.db
                .query("boards")
                .withSearchIndex("search_title", (q) => 
                    q
                      .search("title", searchTitle)
                      .eq("orgId", args.orgId)    
                )
                .collect();
        }else{
            boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();       
        }

        const boardsWithFavoriteRelation = boards.map((board) => {
            return ctx.db
                .query("userFavorites")
                .withIndex("by_user_board", (q) => 
                    q
                    .eq("userId", identify.subject)
                    .eq("boardId", board._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...board,
                        isFavorite: !!favorite
                    }
                })
        })

        const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)
        return boardsWithFavoriteBoolean;
    }
})