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

export async function createPost(formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
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

    return {
        errors: {}
    }
    //TODO: revalidate the topic show page
}