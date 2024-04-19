"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { postgresDb } from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";


interface DeleteCommentFormState {

  success?: boolean;
}


export async function deleteComment(commentId : string, formState: DeleteCommentFormState): Promise<DeleteCommentFormState>{
    

      console.log("reached here in comment delete");
      const session = await auth();
      const comment = await postgresDb.comment.findFirst({
        where: { id: commentId }
      });
      const postId = comment?.postId
      const post = await postgresDb.post.findFirst({
        where: { id: postId }
      });
      const topicId =await postgresDb.topic.findFirst({
        where: { id: post?.topicId }
      });
      if (session && session.user && session.user.id === comment?.userId) {
          const itemsToDelete = [commentId];  // Using a Set to avoid duplicates
          const queue = [commentId];
          while (queue.length > 0) {
              const currentId = queue.shift();
              const childComments = await postgresDb.comment.findMany({
                  where: { parentId: currentId }
              });
              for (const each of childComments){
                queue.push(each.id)
                itemsToDelete.push(each.id)
              }
          }
          itemsToDelete.reverse()
          for (const idToDelete of itemsToDelete) {
            await postgresDb.comment.delete({
                where: { id: idToDelete }
            });
            console.log("deleted")
          }
        }
    redirect(paths.postShow(topicId? topicId.slug?topicId.slug:"/" :"/", postId? postId:""));
}



export async function updateComment(commentId : string, newContent:string, formState: DeleteCommentFormState): Promise<DeleteCommentFormState>{
    

  console.log("reached here in comment update");
  const session = await auth();
  const comment = await postgresDb.comment.findFirst({
    where: { id: commentId }
  });
  const postId = comment?.postId
  const post = await postgresDb.post.findFirst({
    where: { id: postId }
  });
  const topicId =await postgresDb.topic.findFirst({
    where: { id: post?.topicId }
  });

  if (session && session.user && session.user.id === comment?.userId) {
    await postgresDb.comment.update({
      where: { id: commentId},
      data:{
        content:newContent
      }
  });
  console.log("updated")
    }
redirect(paths.postShow(topicId? topicId.slug?topicId.slug:"/" :"/", postId? postId:""));
}