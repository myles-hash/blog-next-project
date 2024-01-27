import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import EditCommentBtn from "@/app/comps/EditComment";
import Link from "next/link";
import DeleteCommentBtn from "@/app/comps/DeleteCommentBtn";

export default async function EditCommentPage({ params }){
    console.log(params)
    async function handleEditComment(formData){
        "use server";
        const username = formData.get("username");
        const comment = formData.get("comment");

        await sql `
        UPDATE comments
        SET username = ${username}, comment = ${comment}, date_comments = CURRENT_DATE, time_comments = CURRENT_TIME
        WHERE post_id = ${params.id}
        AND id = ${params.commentId}`;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
        
    }

    async function handleDeleteComment(){
        "use server";

        await sql `
        DELETE FROM comments 
        WHERE post_id = ${params.id}
        `;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
        
    }

    let ogComments = await sql `
    SELECT * FROM comments WHERE post_id = ${params.id}
    AND id = ${params.commentId}`;

    let date = `${ogComments.rows[0].date_comments}`.substring(0,11)
    let time = `${ogComments.rows[0].time_comments}`.substring(0,9)
    return(
        <div>
            <h2>Comment by {ogComments.rows[0].username}:</h2>
            <h3>Comment: {ogComments.rows[0].comment}</h3>
            <h4>Date: {date} Time: {time}</h4>
            <h2>Edit Comment:</h2>
            <form action={handleEditComment}>
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='comment' >Comment:</label>
                <input id='comment' name='comment' type='text' required/>
                <EditCommentBtn />
            </form>
            <form action={handleDeleteComment}>
            <DeleteCommentBtn />
            </form>
            <Link href={`/posts/${params.id}`}>BACK TO POST</Link>
        </div>
    );
}