"use client";
import { useFormStatus } from "react-dom";

export default function SaveCommentBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Posting comment...": "Post comment"}
        </button>
    );
}