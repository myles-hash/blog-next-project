import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SaveCommentBtn from "@/app/comps/SaveCommentBtn";
import Link from "next/link";
import DeleteBtn from "@/app/comps/DeleteBtn";




export default async function Post({ params }){
    console.log(params)
    const posts = await sql`
    SELECT * FROM posts WHERE id = ${params.id}
    `;

    const comments = await sql`
    SELECT * FROM comments WHERE post_id = ${params.id}
    `;

    const anyComments = await sql`
    SELECT COUNT(*) FROM comments WHERE post_id = ${params.id}`
    ;

    
    async function handleSaveComment(formData){
        "use server";
        const username = formData.get("username");
        const comment = formData.get("comment");
        const post_id = params.id;
        

        await sql`
        INSERT INTO comments (username,comment,post_id,date_comments,time_comments) VALUES
        (${username},${comment},${post_id},CURRENT_DATE, CURRENT_TIME)
        `;

        revalidatePath(`/posts/${params.id}`);

        redirect(`/posts/${params.id}`);
    }

    async function handleDeletePost(){
        "use server";

        await sql `
        DELETE FROM posts 
        WHERE id = ${params.id}
        `;

        revalidatePath(`/posts`);

        redirect(`/posts`);
        
    }
    
    let commentInstruct = ""
    if (anyComments.rows[0].count > 0) {
                
        commentInstruct= "Click to view/edit a comment";
            }
    else {
        commentInstruct = "No comments :("
    }
    




    return (
        <div>
        <div>
        <ul>
                {posts.rows.map((post) => {
                    let date = `${post.date_posts}`.substring(0,11)
                    let time = `${post.time_posts}`.substring(0,8)
                    return (<div key={post.id} className="fullPost">
                        <h1 >{post.title}</h1>
                        <h4>By {post.username}</h4>
                        <h2>{post.content}</h2>
                        <h5>Category: {post.category}</h5>
                        <h6>Date: {date} Time: {time}</h6>
                        </div>
                    )
})}
            </ul>
            </div>
            <div>
            <div className="center">

                    <Link className="link" href={`/posts/${params.id}/edit`}>EDIT POST</Link> / <Link className="link" href="/posts">BACK TO POSTS</Link> <form action={handleDeletePost}>
    <DeleteBtn/>
    </form>
    </div>

            <h2 >Add a Comment</h2>
            <form action={handleSaveComment} className="add-comment-form">
                <label htmlFor='username' >Username:</label>
                <input id='username' name='username' type='text' required/>
                <label htmlFor='comment' >Comment:</label>
                <input id='comment' name='comment' type='text' required/>
                <SaveCommentBtn />
            </form>
            </div>


            <div className="comments-section">
            <h2>Comments</h2>
            <h4>{commentInstruct}</h4>
            
            <div className="comments-section">   
                    {comments.rows.map((comment) => {
                        let date = `${comment.date_comments}`.substring(0,11)
                        let time = `${comment.time_comments}`.substring(0,9)
                        return (
                            <div className="comment" key ={comment.id}>
                            
                        <Link key ={comment.id} href={`/posts/${params.id}/${comment.id}`}>{comment.comment} by ({comment.username})</Link>
                        <p>Date:{date} Time:{time}</p>
                            
                            </div>
                        )
                           
                        
    })
    } 

                </div>
            </div>
            </div>
    )

}
