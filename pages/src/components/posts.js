    import React, { useEffect, useState } from "react";
    import { Navbar, Nav } from "react-bootstrap";
    import { Container, Row} from "react-bootstrap";
    import { Card } from "react-bootstrap";
    import { Button } from "react-bootstrap";
    import { Col } from "react-bootstrap";

    const Posts = () => {
      const [posts, setPosts] = useState([]);

      useEffect(() => {
        const getPosts = async () => {
          const resp = await fetch(
            "https://serverless-api.vamsi-peddi.workers.dev/posts"
          );
          const postsResp = await resp.json();
          setPosts(postsResp);
        };

        getPosts();
      }, []);

      return (
        <div  className="wrapper">
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand href="/">Home</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/posts/newblog">Publish Blog</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <Container>
            <Row className="mt-2"> 
            <Card bg="light" text="dark" className="mb-2">
              <Card.Body>
                <Card.Title> <h3> Welcome to CloudFare Blogs </h3> </Card.Title>
                  <Card.Text> A collection of insightful blogs from CloudFare Users all across the world </Card.Text>  
              </Card.Body>
              </Card>
            </Row>
              
          </Container>

          <Container className = "ml-4"> 
          <Row xs={1} md={2} className="g-4 mt-4"> 
          {posts.map((post) => (
            <Col> 
              <div key={post.id}>
              <Card  className = "">
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>
                      Info about the blog...............
                    </Card.Text>
                  <Button variant="primary" href={`/posts/${post.id}`}>Read More</Button>
                  </Card.Body>
              </Card>
            </div>
            </Col>
          ))}
          </Row>
          </Container>
          
          
        </div>
      );
    };

    export default Posts;