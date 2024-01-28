import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import EditPostBtn from "@/app/comps/EditPost";
import Link from "next/link";

export default async function EditPostPage({ params }){
    async function handleEditPost(formData){
        "use server";
        const username = formData.get("username");
        const title = formData.get("title");
        const content = formData.get("content");
        const category = formData.get("category");

        await sql `
        UPDATE posts
        SET username = ${username}, title = ${title}, content = ${content}, category = ${category}, date_posts = CURRENT_DATE, time_posts = CURRENT_TIME
        WHERE id = ${params.id}
        `;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
        
    }

    let ogPosts = await sql `
    SELECT * FROM posts WHERE id = ${params.id}`;

    let date = `${ogPosts.rows[0].date_posts}`.substring(0,11);
    let time = `${ogPosts.rows[0].time_posts}`.substring(0,9);
    return(
        <div className="container-edit">
            <h1>Edit Post: {ogPosts.rows[0].title}</h1>
            <form action={handleEditPost} className="edit-post-form">
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='title' >Title:</label>
                <input id='title' name='title' type='text' required/>
                <label htmlFor='content'>Message:</label>
                <input id='content' name='content' type='text' required/>
                <label htmlFor='category' name='category' required> Choose a category:</label>
                <select name='category' id= 'category' required>
                    <option value="">...</option>
                    <option value="fun">Fun!</option>
                    <option value="serious">Serious</option>
                </select>
                <EditPostBtn />
            </form>
            <div className="original-post-details">
            <h5>Original Post details:</h5>
            <p>Username: {ogPosts.rows[0].username}</p>
            <p>Title: {ogPosts.rows[0].title}</p>
            <p>Message: {ogPosts.rows[0].content}</p>
            <p>Category: {ogPosts.rows[0].category}</p>
            <p>Date: {date} Time: {time}</p>
            <Link href={`/posts/${params.id}`} className="link-back">BACK TO POST</Link>
            </div>
        </div>
    );
}