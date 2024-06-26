import PostCreateForm from "@/components/posts/post-create-form";
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicsSlug } from "@/db/queries/posts";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/common/loading-skeleton";
import TopicDescriptionShow from "@/components/topics/topic-description-show";
interface TopicShowPageProps{
    params: {
        slug: string
    }
};
export default function TopicShowPage({ params }: TopicShowPageProps) {
    const { slug } = params;

    return (
    <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2">{slug}</h1>
            <Suspense fallback={<LoadingSkeleton />}>
                <PostList fetchData={() => fetchPostsByTopicsSlug(slug)} />
            </Suspense>
            
        </div>
        <div>
            <PostCreateForm slug={slug} />
            <TopicDescriptionShow slug={slug} />
        </div>
    </div>
    )
}