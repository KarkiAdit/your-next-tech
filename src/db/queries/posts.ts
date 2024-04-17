import type { Post } from '@prisma/client';
import { postgresDb } from '@/db';

export type PostWithData = (
    Post & {
        topic: {slug: string};
        user: { name: string | null };
        _count: {comments: number}
    }
);

export function fetchPostsByTopicsSlug(slug: string): Promise<PostWithData[]> {
    return postgresDb.post.findMany({
        where: {topic: { slug }},
        include: {
            topic: {select: { slug: true }},
            user: {select: { name : true }},
            _count: {select: { comments: true }}
        }
    })
}