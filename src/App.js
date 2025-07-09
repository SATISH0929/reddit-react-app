import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://www.reddit.com/r/reactjs.json")
      .then((res) => res.json())
      .then((data) => {
        const children = data.data.children;
        setPosts(children.map((child) => child.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>r/reactjs Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {posts.map((post, index) => (
            <div className="card" key={index}>
              <h2>{post.title}</h2>
              <p>{post.selftext ? post.selftext : "No description available."}</p>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                Visit Post
              </a>
              <p className="score">Score: {post.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
