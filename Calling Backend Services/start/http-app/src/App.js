import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';  // where our endpoint is

class App extends Component {
  state = {
    posts: []
  };

  // this is where the server should be called
  async componentDidMount() {
    // await the result of the call to axios.get and get the actual response object
    const { data: posts } = await axios.get(apiEndpoint);  // send https request and get data
    this.setState({ posts });  // update our posts
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(apiEndpoint, obj);  // creating data and sending the object to the server

    const posts = [post, ...this.state.posts];  // create array to add to our table
    this.setState({ posts });  // update posts
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';

    // using template literals (``) to append to path
    // when using the put method we should send the entire post object
    await axios.put(`${ apiEndpoint }/${ post.id }`, post);  // updates all properties in this specific path

    const posts = [...this.state.posts]  // clone our posts array

    // find index of this post in this array
    const index = posts.indexOf(post);

    // go to that index and create a new object and spread the post argument
    posts[index] = { ...post };

    this.setState({ posts });  // update posts
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
