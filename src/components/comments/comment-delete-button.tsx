"use client"
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from '@nextui-org/react';
import * as actions from "@/actions";


interface CommentDeleteFormProps {
  commentId: string;
}

export default function CommentDeleteForm({
  commentId
}: CommentDeleteFormProps){

  const [formState, action] = useFormState(actions.deleteComment.bind(null,commentId), {
});

  return (
    <form action={action}>
      <Button type="error"> {/* Adjust the button appearance based on your design */}
        Delete
      </Button>
    </form>
  );
};