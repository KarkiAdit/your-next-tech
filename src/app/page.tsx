import { Divider } from '@nextui-org/react';
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/common/loading-skeleton';
import PostList from '@/components/posts/post-list';
import { fetchTopPosts } from '@/db/queries/posts';
export default function Home() {
  return (
  <div className='grid grid-cols-4 gap-4 p-4'>
    <div className='col-span-3'>
      <h1 className='text-xl m-2'>Top Posts</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <PostList fetchData={fetchTopPosts}/>
      </Suspense>
    </div>
    <div className='border shadow py-3 px-2'>
      <TopicCreateForm />
      <Divider className='my-2'/>
      <h3 className='text-lg'>Topics</h3>
      <Suspense fallback={<LoadingSkeleton />}>
        <TopicList />
      </Suspense>
    </div>
  </div>
  );
}
