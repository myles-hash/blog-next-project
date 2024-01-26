import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage(){
    async function handleSavePost(formData){
        "use server";
        const username = formData.get("username");
        const title = formData.get("title");
        const content = formData.get("content");

        await sql `
        INSERT INTO posts (username,title,content) VALUES
        (${username},${title},${content})
        `;

        revalidatePath("/posts");

        redirect("/posts");
    }


    return(
        <div>
            <h1>Create New Post</h1>
            <form action={handleSavePost}>
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='title' >Title:</label>
                <input id='title' name='title' type='text' required/>
                <label htmlFor='content' >Message:</label>
                <input id='content' name='content' type='text' required/>
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}