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
  Button,
  TextField,
  Typography,
  Modal,
  Box,
  MenuItem
} from '@mui/material/';


import _ from "lodash";

import NavBar from '../components/NavBar.js';

import Footer from '../components/Footer.js';

import '../components/Style/landing.css';

// import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'

let client;
client = new ApolloClient({
  uri: "http://127.0.0.1:4000/graphql"
});

const SIGN_IN = 0;
const WFH = 1;
const PERSONALITY = 2;
const DRINKING = 3;
const PETS = 3;
const EXERCISE = 4;


const BACKGROUND_STYLE = {
  backgroundImage: "url('/landing.png')",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'grid'
};
const MODAL_STYLE = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const yesNoSometimes = [
  {
    value: 'YES',
    label: 'YES',
  },
  {
    value: 'NO',
    label: 'NO',
  },
  {
    value: 'SOMETIMES',
    label: 'SOMETIMES',
  }
];
const yesNo = [
  {
    value: 'YES',
    label: 'YES',
  },
  {
    value: 'NO',
    label: 'NO',
  }
];
const introvertExtrovert = [
  {
    value: 'INTROVERT',
    label: 'INTROVERT',
  },
  {
    value: 'EXTROVERT',
    label: 'EXTROVERT',
  }
];
const petSizes = [
  {
    value: 'SMALL',
    label: 'SMALL',
  },
  {
    value: 'MEDIUM',
    label: 'MEDIUM',
  },
  {
    value: 'LARGE',
    label: 'LARGE',
  }
];

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
        ],
        personalDataOpen: false,
        personalDataPage: SIGN_IN,

        // Sign in values
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // Personal Data values
        workFromHome: '',
        drinking: '',
        pets: '',
        petSize: '',
        personality: '',
        exercise: '',

        // Search
        searchInput: ''
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

    togglePersonalDataOpen = () => {
      if (this.state.personalDataOpen) {
        this.setState({
          personalDataPage: SIGN_IN,
  
          // Sign in values
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
  
          // Personal Data values
          workFromHome: '',
          drinking: '',
          pets: '',
          petSize: '',
          personality: '',
          exercise: ''
        });
      }
      this.setState({
        personalDataOpen: !this.state.personalDataOpen
      });
    }

    signInDisabled = () => {
      let x = this.state;
      return (x.firstName == '' || x.lastName == '' || x.email == '' || x.phone == '')
    }

    searchDisabled = () => {
      let x = this.state;
      return (x.searchInput == '')
    }

    savePersonalData = async () => {
      this.togglePersonalDataOpen();



      this.setState({
        personalDataPage: SIGN_IN,

        // Sign in values
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // Personal Data values
        workFromHome: '',
        drinking: '',
        pets: '',
        petSize: '',
        personality: '',
        exercise: ''
      });
    }

    search = async () => {
      
    }

    getPersonalDataPage = () => {
      switch (this.state.personalDataPage) {
        case SIGN_IN:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Tell us who you are
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField label="First Name" value={this.state.firstName} style={{ width: '40%' }}
                  onChange={(e) => {this.setState({ firstName: e.target.value })}}
                /><br />
                <TextField label="Last Name" value={this.state.lastName} style={{ width: '40%' }}
                  onChange={(e) => {this.setState({ lastName: e.target.value })}}
                /><br />
                <TextField label="Email" value={this.state.email} style={{ width: '40%' }}
                  onChange={(e) => {this.setState({ email: e.target.value })}}
                /><br />
                <TextField label="Phone" value={this.state.phone} style={{ width: '40%' }}
                  onChange={(e) => {this.setState({ phone: e.target.value })}}
                /><br />
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  disabled={this.signInDisabled()}
                  onClick={() => this.setState({ personalDataPage: this.state.personalDataPage + 1 })}
                >NEXT</Button>
              </Typography>
            </Box>
          )
        case WFH:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you work from home?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  select
                  label="Select"
                  value={this.state.workFromHome}
                  onChange={(e) => {this.setState({ workFromHome: e.target.value })}}
                  style={{ width: '40%' }}
                >
                  {yesNoSometimes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField><br />
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  onClick={() => this.setState({ personalDataPage: this.state.personalDataPage + 1 })}
                >NEXT</Button>
              </Typography>
            </Box>
          )
        case PERSONALITY:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                What's your personality?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  select
                  label="Select"
                  value={this.state.personality}
                  onChange={(e) => {this.setState({ personality: e.target.value })}}
                  style={{ width: '40%' }}
                >
                  {introvertExtrovert.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField><br />
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  onClick={() => this.setState({ personalDataPage: this.state.personalDataPage + 1 })}
                >NEXT</Button>
              </Typography>
            </Box>
          )
        case PETS:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do/Will you have pets?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  select
                  label="Select"
                  value={this.state.pets}
                  onChange={(e) => {this.setState({ pets: e.target.value })}}
                  style={{ width: '40%' }}
                >
                  {yesNo.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField><br />
                {this.state.pets == 'YES' && 
                <>
                  <h3>What size pet do you have?</h3>
                  <TextField
                    select
                    label="Select"
                    value={this.state.petSize}
                    onChange={(e) => {this.setState({ petSize: e.target.value })}}
                    style={{ width: '40%' }}
                  >
                    {petSizes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField><br />
                </>}
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  onClick={() => this.setState({ personalDataPage: this.state.personalDataPage + 1 })}
                >NEXT</Button>
              </Typography>
            </Box>
          )
        case DRINKING:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you like to go out on the weekends?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  select
                  label="Select"
                  value={this.state.drinking}
                  onChange={(e) => {this.setState({ drinking: e.target.value })}}
                  style={{ width: '40%' }}
                >
                  {yesNoSometimes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField><br />
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  onClick={() => this.setState({ personalDataPage: this.state.personalDataPage + 1 })}
                >NEXT</Button>
              </Typography>
            </Box>
          )
        case EXERCISE:
          return (
            <Box sx={MODAL_STYLE}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you like to exercise?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  select
                  label="Select"
                  value={this.state.exercise}
                  onChange={(e) => {this.setState({ exercise: e.target.value })}}
                  style={{ width: '40%' }}
                >
                  {yesNoSometimes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField><br />
                <Button variant="contained" style={{
                    float: 'right'
                  }}
                  onClick={() => this.savePersonalData()}
                >SAVE</Button>
              </Typography>
            </Box>
          )
      }
    }
  
    render() {
      
      return (
        <div style={BACKGROUND_STYLE}>    
                
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
                <TextField id="filled-basic" label="City or zip code" variant="filled"
                  style={{
                    width: '85%',
                    fontSize: '20px',
                    backgroundColor: 'white'
                  }} 
                  value={this.state.searchInput}
                  onChange={(e) => this.setState({ searchInput: e.target.value })}
                />
                  <Button variant="contained" onClick={() => this.search()} disabled={this.searchDisabled()}>SEARCH</Button><br /><br />
                  <Button variant="contained" onClick={() => this.togglePersonalDataOpen()}>PERSONALIZE YOUR SEARCH</Button>
              </div>
            </div>
            
          </div>
          <Modal
            open={this.state.personalDataOpen}
            onClose={this.togglePersonalDataOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            {this.getPersonalDataPage()}
          </Modal>
          <Footer />
        </div>
      );
    }
  }
  
  export default Landing;