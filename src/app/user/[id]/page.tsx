'use client';

import  { Avatar, Divider } from '@nextui-org/react';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/common/loading-skeleton';
import AdminCreateDelete from '@/components/admin/admin-create-delete';
import PostList from '@/components/posts/post-list';
import AdminList from '@/components/admin/admin-list';
import { fetchPostsByUserId } from '@/db/queries/posts';
import { useSession } from 'next-auth/react';
import { fetchAdmins } from '@/mongodb/admin/admin-query';
export default function UserProfile(){
    const session = useSession();
    
    let authContent: React.ReactNode;
    
    if (session.status === 'loading') {
        authContent = null;
    } else if (session.data && session.data.user) {
        const userId = session.data.user.id;
        authContent = (
            <div className='grid grid-cols-4 gap-4 p-4'>
                <div className='col-span-1 flex flex-col items-center'>
                    <Suspense fallback={<LoadingSkeleton />}>
                        <div className='flex flex-col items-center font-bold cursor-pointer'>
                            <Avatar src={session.data.user.image || ""} style={{ height: '150px', width: '150px' }} />
                            <p className='mr-3'>{session.data.user.name}</p>
                        </div>
                        <AdminCreateDelete />
                    <Suspense>
                        {/* <AdminList fetchData={fetchAdmins}/> */}
                    </Suspense>
                    </Suspense>
                </div>
                <div className='border shadow py-3 px-2 col-span-3'>
                    <h3 className='text-lg'>Your Posts</h3>
                    <Divider className='my-2'/>
                    <Suspense fallback={<LoadingSkeleton />}>
                        {/* <PostList fetchData={() => fetchPostsByUserId(userId)}/> */}
                    </Suspense>
                </div>
            </div>
        )
    } else {
        authContent = null;
    }
     
    return authContent;
}