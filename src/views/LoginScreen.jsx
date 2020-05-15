/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";

class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Estos son objetos del dia
      usuario: "",
      password: ""

      
    }
  }
 

  componentDidMount(){
  }

 

  


  render() {
    return (
        <div className="content">
        LOGIN
        </div>
    );
  }
}

export default LoginScreen;
