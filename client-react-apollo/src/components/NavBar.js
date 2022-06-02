import React, { Component, Fragment } from 'react';
import { 
  Tooltip,
  Modal, ModalBody, ModalFooter,
  Button,
  Table,
} from 'reactstrap';

import './Style/navbar.css';

import Alert from 'react-bootstrap/Alert';

class NavBar extends Component {

    constructor(props) {
      super(props);

      this.state = {
        homeTooltipOpen: false,

        // Contact Modal
        contactOpen: false,

        // Validation
        alertMessage: "",
        showDangerAlert: false,
        showSuccessAlert: false,
      };

      this.toggleHomeTooltip = this.toggleHomeTooltip.bind(this);
    }

    async componentDidMount(){

    }

    
    toggleHomeTooltip = () => {
      this.setState({homeTooltipOpen: !this.state.homeTooltipOpen});
    }

    tryOurTeam = () => {
      window.location.href = '/#/OurTeam';
    }

    tryServices = () => {
      window.location.href = '/#/Services';
    }

    tryLanding = () => {
      window.location.href = '/#/Landing';
    }


    /**
     * Sets the danger alert message and the show state.
     * @param message The alert message to show the user.
     */
    setDangerAlert = (message) => {
        this.setState({
            alertMessage: message,
            showSuccessAlert: false,
            showDangerAlert: true
        });
    }

    /**
     * Sets the success alert message and the show state.
     * @param message The alert message to show the user.
     */
    setSuccessAlert = (message) => {
        this.setState({
            alertMessage: message,
            showSuccessAlert: true,
            showDangerAlert: false
        });
    }

    /**
     * Displays the danger alert. This method is called in render.
     */
    showDangerAlert = () => {
        return (
            <Alert variant="danger" onClose={() => this.setState({ showDangerAlert: false })} dismissible>
                <h4>{this.state.alertMessage}</h4>
            </Alert>
        );
    }

    /**
     * Displays the success alert. This method is called in render.
     */
    showSuccessAlert = () => {
        return (
            <Alert variant="success" onClose={() => this.setState({ showSuccessAlert: false })} dismissible>
                <h4>{this.state.alertMessage}</h4>
            </Alert>
        );
    }

    toggleContactOpen = () => {
        this.setState({
          contactOpen: !this.state.contactOpen
        });
    }

    render(){

        return(
          <div className='header top'>          
            <ul className="sublet-navbar">
                <li className="sublet-navbar-item-2"> <button onClick={(e) => this.tryLanding()} className="b1" id="home"> 
                Home
                </button> </li>
                <li className="sublet-navbar-item-2"> <button onClick={(e) => this.tryOurTeam()} className="b1">Our Team</button> </li>
                <li className="sublet-navbar-item-2"> <button onClick={(e) => this.tryServices()} className="b1">Services</button> </li>
                <li className="sublet-navbar-item" style={{ float: "right", paddingRight: "30px" }}> <button onClick={(e) => this.toggleContactOpen()} className="b1">Contact</button> </li>
                
            </ul>

            {/* <Modal isOpen={this.state.contactOpen} toggle={this.toggleContactOpen} scrollable={true} style={{ maxWidth: "80%" }} onClosed={() => this.setState({  })}>
                <ModalBody>
                    <div
                        style={{
                            "height": "100%",
                            "width": "35%",
                            "float": "left"
                        }}
                    >
                      <b>Contact us for a consultation</b><br />
                      As a Service-Disabled Veteran-Owned Small Business with extensive experience contracting for software and research services 
                      in the Federal defense space, we maintain a robust network of research and commercialization professionals. 
                    </div>
                    <div
                        style={{
                            "height": "100%",
                            "width": "65%",
                            "float": "right"
                        }}
                    >
                      <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Address</b><br />
                                    1 Placeholder Court<br />
                                    Norfolk, Virginia 235XX
                                </td>

                                <td>
                                    <b>Contract Vehicles</b><br />
                                    DUNS:<br />
                                    Norfolk, Virginia 235XX
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Email</b><br />
                                    contact@sublettechnologies.us
                                </td>

                                <td>
                                    <b>Phone</b><br />
                                    (XXX) XXX-XXXX
                                </td>
                            </tr>
                        </tbody>
                      </Table>
                    </div>
                </ModalBody>
            </Modal> */}
          </div>
        );
    }

}


export default NavBar;