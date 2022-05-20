/**
 * @fileoverview This file contains the Landing page implementation.
 */ 

import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
// import { InMemoryCache, ApolloClient } from '@apollo/client';

let client;

client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});


 class Landing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {

      };
    }  
  
    componentDidMount() {
      window.scrollTo(0, 0);
    }
  
    render() {
      return (
        <div>
            This is a blank landing page
          
        </div>
      );
    }
  }
  
  export default Landing;