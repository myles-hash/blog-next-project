import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export default async function Post({ params }){
    const posts = await sql`
    SELECT * FROM posts WHERE id = ${params.id}
    `;

    const comments = await sql`
    SELECT * FROM comments WHERE post_id = ${params.id}
    `;

    

    async function handleSaveComment(formData){
        "use server";
        const username = formData.get("username");
        const comment = formData.get("comment");
        const post_id = params.id;

        await sql`
        INSERT INTO comments (username,comment,post_id) VALUES
        (${username},${comment},${post_id})
        `;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
    }





    
    return (
        <div>
        <div>
        <ul>
                {posts.rows.map((post) => {
                    return (<div key={post.id}>
                        <h1>{post.title}</h1>
                        <h4>By {post.username}</h4>
                        <h2>{post.content}</h2>
                        </div>
                    )
})}
            </ul>
            </div>
            <div>
            <h2>Add a Comment</h2>
            <form action={handleSaveComment}>
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='comment' >Comment:</label>
                <input id='comment' name='comment' type='text' required/>
                <button type='submit'>Save</button>
            </form>
            </div>


            <div>
            <h2>Comments</h2>
            <ul>    
                    {comments.rows.map((comment) => {
                        return (<div key={comment.id}>
                            <h2>By {comment.username}</h2>
                            <h4>{comment.comment}</h4>
                            </div>
                        )
    })}
                </ul>
            </div>
            </div>
    )

}
