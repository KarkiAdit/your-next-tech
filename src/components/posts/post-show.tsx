import { postgresDb } from "@/db";
import { notFound } from "next/navigation";
import PostDeleteForm from "./post-delete-form";

interface PostShowProps {
  postId: string
};

export default async function PostShow({ postId }: PostShowProps) {
  const post = await postgresDb.post.findFirst({
    where: { id: postId }
  });

  if (!post) {
    notFound();
  }
 
  return (
    <div className="m-4">
      <div className="flex-1 space-y-3">
        <h1 className="text-2xl font-bold my-2">{post.title}</h1>
        <PostDeleteForm postId={post.id}/>
      </div>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
