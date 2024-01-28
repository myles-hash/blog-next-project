"use client";
import { useFormStatus } from "react-dom";

export default function DeleteBtn() {
    const formStatus = useFormStatus();

    return (
        <button type="submit" disabled={formStatus.pending} className="delBtn">
            {formStatus.pending ? "Deleting Post...": "DELETE POST"}
        </button>
    );
}