import { redirect } from "next/navigation";
import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/common/loading-skeleton";
interface SearchPageProps {
    searchParams: {
        term: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps){
    const { term } = searchParams;

    if (!term){
        redirect('/');
    }

    return(
        <Suspense fallback={<LoadingSkeleton />}>
            <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
        </Suspense>
    );
}