import React, { useEffect, useState } from "react";
import { Navbar, Nav, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const Post = ({ id }) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const resp = await fetch(
        `https://serverless-api.vamsi-peddi.workers.dev/posts/${id}`
      );
      const postResp = await resp.json();
      setPost(postResp);
    };

    getPost();
  }, [id]);

  if (!Object.keys(post).length) return <div />;

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
          <Card.Header>{post.username}</Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
              <Card.Text>
                {post.content}
              </Card.Text>
              <Button href="/" variant="primary">Go Back to Home</Button>
          </Card.Body>
          <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
      </Row>
      </Container>
      
      
    </div>
  );
};

export default Post;