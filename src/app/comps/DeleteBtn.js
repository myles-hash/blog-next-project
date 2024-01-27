"use client";
import { useFormStatus } from "react-dom";

export default function DeleteBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending}>
            {formStatus.pending ? "Deleting Post...": "DELETE POST"}
        </button>
    );
}