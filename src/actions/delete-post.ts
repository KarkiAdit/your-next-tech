"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { postgresDb } from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { title } from "process";

interface DeletePostFormState {

  success?: boolean;
}

export async function deletePost(postId : string, formState: DeletePostFormState): Promise<DeletePostFormState>{
  
      console.log("reached here in post delete");
      const session = await auth();
      const post = await postgresDb.post.findFirst({
        where: { id: postId }
      });

      const topicId =await postgresDb.topic.findFirst({
        where: { id: post?.topicId }
      });

      if (session && session.user && session.user.id === post?.userId) {
            await postgresDb.post.delete({
                where: { id: post.id }
            });
            console.log("deleted")
          }
    redirect("/")
}


export async function updatePost(postId : string,newTitle:string,newContent:string, formState: DeletePostFormState): Promise<DeletePostFormState>{
  
  console.log("reached here in post update");
  const session = await auth();
  const post = await postgresDb.post.findFirst({
    where: { id: postId }
  });

  const topicId =await postgresDb.topic.findFirst({
    where: { id: post?.topicId }
  });

  if (session && session.user && session.user.id === post?.userId) {
        await postgresDb.post.update({
            where: { id: post.id },
            data:{
              title:newTitle,
              content:newContent
            }
        });
        console.log("updated")
      }
redirect(paths.postShow(topicId? topicId.slug:"/",post?.id? post.id:""))
}