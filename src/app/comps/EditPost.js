"use client";
import { useFormStatus } from "react-dom";

export default function EditPosyBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending} className="edit-post-formBtn">
            {formStatus.pending ? "Editing post...": "Edit post"}
        </button>
    );
}