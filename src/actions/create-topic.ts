'use server';

import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { postgresDb } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {message: 'Must be lowercase letters or dashes without spaces'}),
    description: z.string().min(10)
});

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
};

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
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

    // Handle database errors
    let topic: Topic;
    try {
        topic = await postgresDb.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
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
                    _form: ['Something went wrong']
                }
            }
        }
    }
    
    // Handle caching and path redirection
    revalidatePath(paths.home());
    redirect(paths.topicShow(topic.slug));
}