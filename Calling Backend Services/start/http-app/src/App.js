import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import httpService from "./services/httpService";
import config from './config.json';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  // this is where the server should be called
  async componentDidMount() {
    // await the result of the call to axios.get and get the actual response object
    const { data: posts } = await httpService.get(config.apiEndpoint);  // send https request and get data
    this.setState({ posts });  // update our posts
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await httpService.post(config.apiEndpoint, obj);  // creating data and sending the object to the server

    const posts = [post, ...this.state.posts];  // create array to add to our table
    this.setState({ posts });  // update posts
  };

  handleUpdate = async post => {
    post.title = 'UPDATED';

    // using template literals (``) to append to path
    // when using the put method we should send the entire post object
    await httpService.put(`${ config.apiEndpoint }/${ post.id }`, post);  // updates all properties in this specific path

    const posts = [...this.state.posts]  // clone our posts array

    // find index of this post in this array
    const index = posts.indexOf(post);

    // go to that index and create a new object and spread the post argument
    posts[index] = { ...post };

    this.setState({ posts });  // update posts
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;  // reference to our previous state in case the call to the server fails

    // compare id of the post with the id we are deleting
    const posts = this.state.posts.filter(p => p.id !== post.id);  // we want all posts except post we are are deleting
    this.setState({ posts });  // update posts which now has one less post

    try {  // attempt to call the server
      await httpService.delete(`s${ config.apiEndpoint }/${ post.id }`);  // delete object from this resource
    }
    catch (ex) {  // when we get an exception/error
      
      // Expected errors (404: not found, 400: bad request) these are client errors
      if (ex.response && ex.response.status === 404)  // if the response and the status equalling 404 are truthy
        alert('This post has already been deleted.');

      this.setState({ posts: originalPosts });  // revert changes cause the call to server failed
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer

        />
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
