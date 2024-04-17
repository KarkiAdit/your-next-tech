'use server';

import type { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { postgresDb } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[]
    }
};

export async function createPost(slug : string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    // Check for form fields' errors
    if (!result.success){
        return  {
            errors: result.error.flatten().fieldErrors
        }
    };

    // Notify user to login before creating a post
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to do this.']
            }
        };
    }

    // Handle topic not found in database
    const topic = await postgresDb.topic.findFirst({
        where: { slug }
    });
    if (!topic) {
        return {
            errors: {
                _form: ['Cannon find topic']
            }
        }
    };
    
    // Handle database errors
    let post: Post;
    try {
        post = await postgresDb.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong. Failed to create post']
                }
            }
        }
    }
    
    // Handle caching and path redirection
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}