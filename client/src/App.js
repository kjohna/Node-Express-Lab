import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }

  getComments() {
    axios.get('http://localhost:4001/api/posts')
    .then(res => {
      this.setState({
        comments: res.data
      })
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    const comments = this.state.comments.map( comment => {
      return (
        <Card key={comment.id} 
          raised 
          style={{ 
            margin: "15px",
            padding: "15px", 
            maxWidth: "250px" 
          }}
        >
          <Typography variant="h5">Comment ID: {comment.id}</Typography>
          <Typography variant="body1">{comment.title}</Typography>
          <Typography variant="body2">{comment.contents}</Typography>
        </Card>
      );
    });
    return (
      <div className="App">
        <Typography variant="h3">Welcome to Posts</Typography>
        <Typography variant="h4">Current Posts:</Typography>
        <Grid 
          container
          direction="row"
          justify="space-evenly"
          style={{
            padding: "50px"
          }}
        >
          {comments}
        </Grid>
      </div>
    );
  }
}

export default App;
