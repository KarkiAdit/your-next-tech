'use server';

import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import dbConnect from '@lib/dbConnect';
import { Admin } from '@/mongodb';

interface AdminState {
    errors: {
        message: string;
        isAdmin?: boolean;
    }
};
export async function createOrDeleteAdmin(formState: AdminState): Promise<AdminState> {
    // Check if user is signed in or not
    const session = await auth();
    if (session && session.user) {
        const user = session.user;
        // Handle database errors
        try {
            await dbConnect();
            // Remove admin if already exists
            const deletedAdmin = await Admin.findOneAndDelete({"userInfo.id": session.user.id});
            if (deletedAdmin) {
                console.log("Admin was deleted:", deletedAdmin);
            } else {
                await Admin.create({ userInfo: {...user}});
            }
            // Handle caching and path redirection
            revalidatePath(paths.userProfile(user.id));
            // Change the isAdmin state
            return {
                errors: {
                    message: "New admin created",
                    isAdmin: !formState.errors.isAdmin
                }
            };
        // Handle any database errors
        } catch (err) {    
            if (err instanceof Error) {
                return {
                  errors: {
                   message: err.message,
                  },
                };
              } else {
                return {
                  errors: {
                    message: "Something went wrong...",
                  },
                };
              }
        }
    }
    // Handle user not signed in
    return {
        errors: {
            message: 'You need to sign in first',
        }
    };
}