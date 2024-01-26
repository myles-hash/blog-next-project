import { sql } from "@vercel/postgres";
import Link from "next/link";


export default async function PostsPage() {
    const posts = await sql `
    SELECT * FROM posts
    `;


    return (
        <div>
            <h1>Posts</h1>
                {posts.rows.map((post) => {
                    return (
                        <>
                        <ul key ={post.id}>
                    <Link key ={post.id} href={`/posts/${post.id}`}>{post.title} by ({post.username}) <br/>(category:{post.category})</Link>
                        </ul>
                        </>
)})}

        </div>
    )
}