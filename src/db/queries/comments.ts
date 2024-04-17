import type { Comment } from "@prisma/client";
import { postgresDb } from "@/db";

export type CommentWithAuthor = Comment & {
    user: { name: string | null; image: string | null};
};

export function fetchCommentsByPostId(postId: string): Promise<CommentWithAuthor[]>{
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
}