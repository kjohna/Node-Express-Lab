import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import './App.css';

const emptyCommentForm = {
  title: "",
  contents: "",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      ...emptyCommentForm
    }
  }

  handleChanges = (e) => {
    this.setState ({
      [e.target.name]: e.target.value
    });
  }

  getComments() {
    axios.get('/api/posts')
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err));
  }

  addPost = (e) => {
    e.preventDefault();
    const postFormData = {
      title: this.state.title,
      contents: this.state.contents
    }
    axios.post('/api/posts', postFormData)
      .then(res => {
        // console.log(res.data.message);
        this.setState({ 
          posts: res.data.message,
          ...emptyCommentForm
        });
      })
      .catch(err => {
        console.log(`error addComment: ${err}`);
      })
  }

  deletePost(id) {
    console.log("delete post: ", id);
    axios.delete(`/api/posts/${id}`)
      .then(res => {
        this.getComments();
      })
      .catch( err => {
        console.log(`error deletePost id ${id}. Err: ${err}`);
      })
  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    const posts = this.state.posts.map( post => {
      return (
        <Card key={post.id} 
          raised 
          style={{ 
            margin: "15px",
            padding: "15px", 
            maxWidth: "250px",
            textAlign: "left"
          }}
        >
          <Typography variant="h5">Post ID: {post.id}</Typography>
          <Typography variant="body1">{post.title}</Typography>
          <Typography variant="body2">{post.contents}</Typography>
          <Button
            onClick={() => this.deletePost(post.id)}
          >Delete Post</Button>
        </Card>
      );
    });
    return (
      <div className="App">
        <Typography variant="h3">Welcome to Posts</Typography>
        <Typography variant="h4">Add Post</Typography>
        <Grid 
          container
          direction="row"
          justify="space-evenly"
          style={{
            padding: "25px"
          }}
        >
          <Card
            raised 
            style={{ 
              padding: "15px", 
              maxWidth: "250px",
              textAlign: "left"
            }}
          >
            <form onSubmit={this.addPost}>
              <TextField
                variant="outlined"
                label="Title"
                name="title"
                value={this.state.title}
                onChange={this.handleChanges}
                autoComplete="off"
                style={{ width: '100%', paddingBottom: "15px" }}
              />
              <TextField
                variant="outlined"
                label="Contents"
                name="contents"
                value={this.state.contents}
                onChange={this.handleChanges}
                autoComplete="off"
                style={{ width: '100%', paddingBottom: "15px" }}
              />
              <Button type="submit">Add Post</Button>
            </form>
          </Card>
        </Grid>
        <Typography variant="h4">Current Posts:</Typography>
        <Grid 
          container
          direction="row"
          justify="space-evenly"
          style={{
            padding: "50px"
          }}
        >
          {posts}
        </Grid>
      </div>
    );
  }
}

export default App;
