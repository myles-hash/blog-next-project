import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import EditCommentBtn from "@/app/comps/EditComment";
import Link from "next/link";

export default async function EditCommentPage({ params }){
    console.log(params)
    async function handleEditComment(formData){
        "use server";
        const username = formData.get("username");
        const comment = formData.get("comment");

        await sql `
        UPDATE comments
        SET username = ${username}, comment = ${comment}
        WHERE post_id = ${params.id}
        AND id = ${params.commentId}`;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
        
    }

    let ogComments = await sql `
    SELECT * FROM comments WHERE post_id = ${params.id}
    AND id = ${params.commentId}`;
    return(
        <div>
            <h2>Comment by {ogComments.rows[0].username}:</h2>
            <h3>Comment: {ogComments.rows[0].comment}</h3>
            <h4>Edit Comment: {ogComments.rows.comment}</h4>
            <form action={handleEditComment}>
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='comment' >Comment:</label>
                <input id='comment' name='comment' type='text' required/>
                <EditCommentBtn />
            </form>
            <Link href={`/posts/${params.id}`}>BACK TO POST</Link>
        </div>
    );
}