import AddComment from "@/comps/CommentForm";
import { sql } from "@vercel/postgres";


export default async function Post({ params }){
    const posts = await sql`
    SELECT * FROM posts WHERE id = ${params.id}
    `;
    
    return (
        <>
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
            </>
    )

}