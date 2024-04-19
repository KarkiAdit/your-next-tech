import type { Comment } from "@prisma/client";
import { postgresDb } from "@/db";
import { cache } from 'react';
// import { auth } from "@/auth";

export type CommentWithAuthor = Comment & {
    user: { name: string | null; image: string | null};
};

export const fetchCommentsByPostId = cache((postId: string): Promise<CommentWithAuthor[]> => {
    console.log("reacheeddd")
    return postgresDb.comment.findMany({
        where: { postId },
        include: {
            user: {
                select: {
                    name: true,
                    image: true
                }
            }
        }
    });
});


