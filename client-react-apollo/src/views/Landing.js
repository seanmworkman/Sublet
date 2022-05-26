/**
 * @fileoverview This file contains the Landing page implementation.
 */ 

import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
// import { InMemoryCache, ApolloClient } from '@apollo/client';
import {
  GET_ALL_PLACES_WITH_SPECS,
  GET_ALL_USERS
} from "../graphql/queries.js"

import { 
  Card, CardBody,
  Button,
} from 'reactstrap';

import _ from "lodash";

import NavBar from '../components/NavBar.js';

import Footer from '../components/Footer.js';

// import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

let client;
client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});

 class Landing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        users: [],
        places: []
      };
    }
  
    componentDidMount() {
      window.scrollTo(0, 0);
      this.getAllUsers();
      this.getAllPlaces();
    }

    getAllUsers = async () => {
      try {
        let res = await client.query({
          query: GET_ALL_USERS,
          fetchPolicy: 'network-only'
        });
        this.setState({
          users: res.data.getAllUsers
        });
        console.log(res.data.getAllUsers);
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      }
    }

    getAllPlaces = async () => {
      try {
        let res = await client.query({
          query: GET_ALL_PLACES_WITH_SPECS,
          fetchPolicy: 'network-only'
        });
        this.setState({
          places: res.data.getAllPlacesWithSpecs
        });
        console.log(res.data.getAllPlacesWithSpecs);
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      }
    }
  
    render() {
      return (
        <div>            
          <div id="container">
            <NavBar />
            
            {this.state.places[0] != undefined ? (
              <>
                {this.state.places.map(key => {
                  return (
                    <Card>
                      <CardBody>
                        {this.state.places[key].address_line1}<br />
                        {this.state.places[key].address_line2}<br />
                        {this.state.places[key].city},
                        {this.state.places[key].state}
                        {this.state.places[key].zip_code}
                        Specs:<br />
                        {this.state.places[key].sqrft} sqrft<br />
                        {this.state.places[key].bedrooms} bedrooms<br />
                        {this.state.places[key].bathrooms} bathrooms<br />
                        <h3>${this.state.places[key].price}</h3>
                        <Button>
                          Button
                        </Button>
                      </CardBody>
                    </Card>
                  )
                })}
              </>
            ) : null}

          </div>
          <Footer />
        </div>
      );
    }
  }
  
  export default Landing;