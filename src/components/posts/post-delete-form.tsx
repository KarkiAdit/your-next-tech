"use client"
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from '@nextui-org/react';
import * as actions from "@/actions";


interface PostDeleteFormProps {
  postId: string;
}

export default function PostDeleteForm({
  postId
}: PostDeleteFormProps){

  const [formState, action] = useFormState(actions.deletePost.bind(null,postId), {
});

  return (
    <form action={action}>
      <Button type="error"> {/* Adjust the button appearance based on your design */}
        Delete Post
      </Button>
    </form>
  );
};