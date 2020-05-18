
import React, { useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Importo estilos custom
import "./assets/css/styles.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";


import AdminLayout from "layouts/Admin.jsx";
import LoginScreen from "layouts/LoginScreen.jsx";

import Rutas from './rutas'
const isLoged = false;

function HandleLogin(data){
  const [loggedInStatus,setLoggedInStatus] = useState("LOGGED_IN")
}

const   handleLogin = (data) => {

  // const [loggedInStatus, setLoggedInStatus] = useState("LOGGED_IN")

  this.setState({
    loggedInStatus: "LOGGED_IN",
    user: data.user
  });
}
ReactDOM.render(
  <Rutas/>,
  document.getElementById("root")
);
