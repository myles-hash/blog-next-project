import { sql } from "@vercel/postgres";
import Link from "next/link";


export default async function PostsPage({ searchParams }) {
    


    let posts;
    if (searchParams.sort === "fun") {
         posts = await sql `
        SELECT * FROM posts WHERE category = ${searchParams.sort}
        `;
      }
    else if (searchParams.sort === "serious") {
         posts = await sql `
        SELECT * FROM posts WHERE category = ${searchParams.sort}
        `;
      }
    else {
     posts = await sql `
    SELECT * FROM posts
    `;
    }


    

    return (
        <div>
            <h1>Posts</h1>
            <Link href="/posts">All Posts</Link> - <Link href="/posts?sort=fun">Fun Posts</Link> - <Link href="/posts?sort=serious">
            Serious Posts
          </Link>
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