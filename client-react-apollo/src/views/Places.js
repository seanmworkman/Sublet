/**
 * @fileoverview This file contains the Places page implementation.
 */

 import React, { Component } from 'react';
 import ApolloClient from "apollo-boost";

 import {
    Button,
    TextField,
    Typography,
    Modal,
    Box,
    MenuItem
  } from '@mui/material/';

 import {
  SEARCH
} from '../graphql/queries.js';

let client;

client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});


 class Places extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        places: []
      };
    }  
  
    componentDidMount() {
        this.setState({
            places: JSON.parse(window.sessionStorage.getItem("placeSearchResult"))
        });
        console.log(JSON.parse(window.sessionStorage.getItem("placeSearchResult")))
    }
  
    render() {
      return (
        <div>
          
        </div>
      );
    }
  }
  
  export default Places;