export const metadata = {
    title: "Post Page | About",
    description: "This is the about page for post page made by me, Myles",
  };

import Link from "next/link";

export default function AboutPage(){
    return(
        <div className="about">
            <h1>About</h1>
            <h2>Posts</h2>
            <p>To view existing posts, navigate to <Link href = "/posts">POSTS</Link> in the navbar at the top of the page.</p> 
            <p>You may sort the posts by all, or by the fun/serious categories.</p>
            <p>If you want to view a post and its content, just click on it!</p>
            <p>You may edit a specific post by pressing EDIT POST while viewing it. The post may be deleted by pressing the DELETE POST button.</p>
            <h2>Comments</h2>
            <p>Also, you can add comments by filling out the form just underneath the post. Comments left by anyone else should already be displayed!</p>
            <p>To view an existing comment, again just click on it! While on the page for the specific comment, you can edit the content of the comment by filling out the from and pressing the EDIT COMMENT button.</p>
            <p>The comment may also be deleted entirely by pressing the DELETE COMMENT button!</p>
            <h2>Create post</h2>
            <p>To add a new post, navigate to <Link href = "/posts/new">CREATE POST</Link> thats also in the navbar at the top of the page.</p>
            <p>Here you may add a new post with a username, title, text content and category of your choice WOW!!</p>
        </div>
    )
}