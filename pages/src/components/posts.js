    import React, { useEffect, useState } from "react";
    import { Link } from "@reach/router";

    const Posts = () => {
      const [posts, setPosts] = useState([]);

      useEffect(() => {
        const getPosts = async () => {
          const resp = await fetch(
            "https://serverless-api.bala-peddi.workers.dev/posts"
          );
          const postsResp = await resp.json();
          setPosts(postsResp);
        };

        getPosts();
      }, []);

      return (
        <div  className="wrapper">
          <h1>Welcome to blogpost, click on links below to read various blog posts </h1>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
            </div>
          ))}
          <h2>
                <Link to={`/posts/newblog`}>Click Here to write new blog ! </Link>
          </h2>
        </div>
      );
    };

    export default Posts;