import { Router } from "@reach/router";

import Posts from './components/posts'
import Post from './components/post'
import UserForm from './components/simplepost'

function App() {
  return (
    <Router>
      <Posts path="/" />
      <Post path="/posts/:id" />
      <UserForm path="/posts/newblog" />
    </Router>
  );
}

export default App;