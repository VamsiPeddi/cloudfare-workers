import React, {useState} from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

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


  const handleSubmit = event => {
    //event.preventDefault();

    const url = 'https://serverless-api.vamsi-peddi.workers.dev/posts'
    //const url = 'http://127.0.0.1:8787/posts'
    console.log("I am here")
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ "data" : { title, username,content } } )
        //body: { "data" : { title, username,content } }
    };
    fetch(url, requestOptions)
        .then(response => console.log('Submitted successfully'))
        .catch(error => console.log('Form submit error', error))
  };

  return (
   <div>
     <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/posts/newblog">Publish Blog</Nav.Link>
              </Nav>
            </Container>
      </Navbar>
      <Container className = "ml-3"> 
      <Row className = "mt-3"> 
        <Card className="text-center mb-3" bg="light">
          <Card.Header>Publish Form</Card.Header>
          <Card.Body>
            <Card.Title>Fill in the form below to publish your blog</Card.Title>
              <Card.Text>
              
              </Card.Text>
              <Button href="/" variant="primary">Go Back</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Row>
      </Container>
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
   </div>
  )
}


export default UserForm;