import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      baseUrl: 'https://practiceapi.devmountain.com/api',
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    let promise = axios.get (this.state.baseUrl + '/posts');
    promise.then((response) => {
      this.setState({
        posts: response.data
      });
    });

  }

  updatePost(id, text) {
    let promise = axios.put(`${this.state.baseUrl}/posts?id=${id}`,{text})
    promise.then((response) => {
      this.setState({
        posts: response.data
      });
    })
  }

  deletePost(id) {
    let promise = axios.delete(`${this.state.baseUrl}/posts?id=${id}`)
    promise.then((response) => {
      this.setState({
        posts: response.data
      })
    })
  }

  createPost(text) {
    let promise = axios.post(`${this.state.baseUrl}/posts`, {text})
    promise.then((response) => {
      this.setState({
        posts: response.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
            createPostFn={this.createPost} 
            />
          {
            posts.map ( (post) => ( 
              <Post 
                key={post.id}
                text={post.text}
                date={post.date}
                id={post.id}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
                />
            ))
          }

        </section>
      </div>
    );
  }
}

export default App;
