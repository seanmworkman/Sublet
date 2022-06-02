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
  Input
} from 'reactstrap';

import _ from "lodash";

import NavBar from '../components/NavBar.js';

import Footer from '../components/Footer.js';

import '../components/Style/landing.css';

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
        places: [
          {
            address_line1: "",
            address_line2: "",
            city: "",
            state: "",
            zip_code: "",
            sqrft: 0.0,
            bedrooms: 0.0,
            bathrooms: 0.0,
            price: 0.0
          }
        ]
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
      const backgroundStyle={
        backgroundImage: "url('/landing.png')",
        height:'100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display: 'grid'
      };
      // const gridContainer = {
      //   display: "grid",
      //   gridTemplateColumns: "auto auto auto",
      //   padding: "10px"
      // }
      // const gridItem = {
      //   padding: "20px",
      //   fontSize: "30px",
      //   textAlign: "center"
      // }
      return (
        <div style={backgroundStyle}>    
                
          <div className='container'>
            {/* <NavBar /> */}
            {/* <br />
            <br />
            <br /> */}
            <div className='section1'>
              <div className='left'>
                <h1 style={{ fontSize: '4em', color: 'white' }}>FIND YOUR NEXT STAY!</h1>
                <hr style={{ borderWidth: '5px' }}/>
                <h1 style={{ fontSize: '3em', color: 'white' }}>
                  Short. <br />
                  Long. <br />
                  or somewhere  in between. <br />
                  we're here to help. <br />
                </h1>
              </div>
              <div className='right2' style={{
                marginTop: '35%'
              }}>
                <Input type='text' placeholder='Enter a City or Zip Code'
                  style={{
                    width: '85%',
                    fontSize: '20px'
                  }} />
                  <button color="primary">SEARCH</button><br /><br />
                  <Button>PERSONALIZE YOUR SEARCH</Button>
              </div>
            </div>
            {/* {this.state.places[0] != undefined ? (
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
            ) : null} */}

          </div>
          
          <Footer />
        </div>
      );
    }
  }
  
  export default Landing;