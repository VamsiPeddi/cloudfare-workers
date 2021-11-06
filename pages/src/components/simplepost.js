import React, {useState} from "react";
import { Link } from "@reach/router";
// [{"id":1,"title":"My First Post","username":"coolguy123","content":"Hey Y'all!"},{"id":2,"title":"Story About my Dogs","username":"kn0thing","content":"So the other day I was in the yard, and..."}]
const UserForm = () =>  {
  const [title, settitle] = useState('')
  const [username, setusername] = useState('')
  const [content, setcontent] = useState('')



  const handletitleChange = event => {
    settitle(event.target.value)
  };
  const handleusernameChange = event => {
    setusername(event.target.value)
  };
  const handlecontentChange = event => {
    setcontent(event.target.value)
  };


  
// A function to make requests to our Workers API using a query
// const handleSubmit = async query => {
//   // The base URL for our API
//   const url = "https://serverless-api.vamsi-peddi.workers.dev/posts"

//   const resp = await fetch(url, {
//     // Send a POST request
//     method: "POST",
//     // With a JSON-stringified body containing the query from our input
//     body: JSON.stringify({ query }),
//     // Set the `Content-type` header so our API knows that the request
//     // is sending JSON
//     headers: { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': '*' }
//   })
//   //return resp.json()
// }

const corsHeaders = { 
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*'

}
  const handleSubmit = async request => {
    // event.preventDefault();

    const url = 'https://serverless-api.vamsi-peddi.workers.dev/posts'
    console.log("I am here")
    // const headers = {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-type': 'application/json'
    // }
    if ( request.method === "OPTIONS") {
      console.log("I am herecxxx")
      return new Response("OK",{headers: corsHeaders})
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        ...corsHeaders
      },
      body: JSON.stringify({ "data" : { title, username,content } } )
      //body: { "data" : { title, username,content } }
  };
    await fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))
  };




  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>title </label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          onChange={handletitleChange}
          value={title}
        />
      </div>
      <div>
        <label>username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          onChange={handleusernameChange}
          value={username}
        />
      </div>
      <div>
        <label>content</label>
        <textarea id="blog" name="content" rows="4" cols="50" onChange={handlecontentChange} value={content} >
          Write your blog in this area
        </textarea>
      </div>
      <button type="submit">
        Submit
      </button>
    </form>
    <p>
        <Link to="/">Go back</Link>
      </p>
    </div>
  )
}

export default UserForm;