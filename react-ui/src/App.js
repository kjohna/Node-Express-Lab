import React, { Component } from 'react';
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
        <li key={comment.id}>
          <h3>Comment ID: {comment.id}</h3>
          <p>{comment.title}</p>
          <p>{comment.contents}</p>
        </li>
      );
    });
    return (
      <div className="App">
        <h1>Welcome to Posts</h1>
        <h3>Current Posts:</h3>
        <ul>
          {comments}
        </ul>
      </div>
    );
  }
}

export default App;
