/**
 * @fileoverview This file contains the Landing page implementation.
 */ 

import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
// import { InMemoryCache, ApolloClient } from '@apollo/client';
import {
  GET_ALL_USERS
} from "../graphql/queries.js"

import _ from "lodash";

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

let client;
client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});

const position = [51.505, -0.09]

 class Landing extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        result: []
      };
    }  
  
    componentDidMount() {
      window.scrollTo(0, 0);
      this.getAllUsers();
    }

    getAllUsers = async () => {
      try {
        let res = await client.query({
          query: GET_ALL_USERS,
          fetchPolicy: 'network-only'
        });
        this.setState({
          result: res.data.getAllUsers
        });
      } catch (err) {
        console.log(JSON.stringify(err, null, 2));
      }
    }
  
    render() {
      return (
        <div>
            This is a blank landing page
            {/* {_.isEmpty(this.state.result) ? null : 
              <div>
                {this.state.result.map((key) => {
                  return (
                    <div>
                      {this.state.result[key].first_name}
                      {this.state.result[key].last_name}
                    </div>
                  )
                })}
              </div>
            } */}
          <div style={{ height: '5%', marginTop: '5%', textAlign: "center", display: 'flex' }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      );
    }
  }
  
  export default Landing;