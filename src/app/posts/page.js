import { sql } from "@vercel/postgres";
import Link from "next/link";

export const metadata = {
  title: "Post Page | Posts ",
  description: "This is an existing post's page. Any posts created will appear here",
};


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
        <div id="postsDiv">
            <h1 className="center">Posts</h1>
            <div className="sort">
            <h2>Sort by:</h2>
            <Link className="link2" href="/posts">All Posts</Link> - <Link className="link2" href="/posts?sort=fun">Fun Posts</Link> - <Link className="link2" href="/posts?sort=serious">
            Serious Posts
          </Link>
          </div>
                {posts.rows.map((post) => {
                  let date = `${post.date_posts}`.substring(0,11)
                  let time = `${post.time_posts}`.substring(0,8)
                    return (
                      <div className="post" key ={post.id}>
                        
                    
                    <Link key ={post.id} href={`/posts/${post.id}`} className="postLink">{post.title} by ({post.username}) <br/>(category:{post.category}) </Link>
                    <p>Date:{date} Time:{time}</p>
                      
                    
                        </div>
)})}
        </div>
    )
}