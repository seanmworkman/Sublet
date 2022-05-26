import React, { Component } from 'react';
import './Style/footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    return (
        <div style={{ height: '30px' }}>
            <div className="footer bottom" style={{
                backgroundColor: '#093782', color: 'white',
            }}>
                © 2022 Sublet LLC. All rights reserved.
            </div>
          
        </div>
    );
  }
}

export default Footer;