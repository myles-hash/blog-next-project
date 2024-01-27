"use client";
import { useFormStatus } from "react-dom";

export default function DeleteCommentBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Deleting Comment...": "DELETE COMMENT"}
        </button>
    );
}