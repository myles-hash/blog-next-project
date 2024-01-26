import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SavePostBtn from "@/app/comps/SavePostBtn";

export default function NewPostPage(){
    async function handleSavePost(formData){
        "use server";
        const username = formData.get("username");
        const title = formData.get("title");
        const content = formData.get("content");
        const category = formData.get("category");

        await sql `
        INSERT INTO posts (username,title,content,category) VALUES
        (${username},${title},${content},${category})
        `;

        revalidatePath("/posts");

        redirect("/posts");s
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
                <label htmlFor='category' name='category' required>Choose a category:</label>
                <select name='category' id= 'category' required>
                    <option value="">...</option>
                    <option value="fun">Fun!</option>
                    <option value="serious">Serious</option>
                </select>
                <SavePostBtn />
            </form>
        </div>
    );
}