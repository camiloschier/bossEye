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
 import "../assets/css/login.css"
 import logo from 'assets/img/medico.svg';
 import { Redirect, Link,BrowserRouter as Router  } from "react-router-dom";
 import { useHistory } from "react-router-dom";

 import sha1 from "js-sha1"

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Estos son objetos del dia
      usuario: "",
      password: "",
      isLoged: false
      
    }
  }
 

  componentDidMount(){
  }

  onChange (event) {
    this.setState({ usuario: event.target.value })
  }
  
  hashearPassword = (event) => {
    console.log("HASH",)
    this.setState({password: sha1(event.target.value)})
  }

  llamadaApiLogin = (usuario,password) => {
    var url = "http://chaco.teledirecto.com:3003/login/"+this.state.usuario+"/"+this.state.password+"/s"
    console.log("URL", url)
    
    const fetchData = fetch(url)
      .then(res => res.json())
      .then((data) => {
      
        return data
      })
      .catch(console.log);

    return fetchData
  }
  
  login =  async() => {
    
    //localStorage.setItem('login',true)
    //console.log("LOCAL",localStorage.getItem('login'))
    if (this.state.usuario.length == "" || this.state.password.length == "") {
      alert("Complete los campos")
      return
    }
    
    console.log("USER", this.state.usuario,"password:",this.state.password)
    const objetoLogin = await this.llamadaApiLogin(this.state.usuario,this.state.password)
    console.log(objetoLogin)
    if (objetoLogin == undefined) {
      alert("Usuario y contraseña erroneo, ingrese nuevamente")
      return
    }
    if (objetoLogin.length > 0 && objetoLogin[0].user == this.state.usuario) {
      //this.setState({isLoged: true}) //aca le paso al componente padre la funcion handleSucessfull
      this.props.handleSucessfullAuth(objetoLogin[0]);
    }
  }
 

  


  render() {
    
    
      return (
        <body  className="bodyLogin">
        <form className="text-center" onSubmit={e => { e.preventDefault(); }}>
          <div className="form-signin">
          <img className="mb-4" src={logo} alt="" width="72" height="72"/>
          <h1 className="h3 mb-3 font-weight-normal" style={{marginBottom:'25px', color:'#272727'}}>Boss Eye Login</h1>
          <label for="inputEmail" className="sr-only">Usuario</label>
          <input type="text" id="inputEmail" className="form-control" placeholder="Usuario" required autofocus onChange={event => this.onChange(event)}/>
          <label for="inputPassword" className="sr-only">Contraseña</label>
          <input type="password" id="inputPassword" className="form-control" onChange={event => this.hashearPassword(event)} placeholder="Contraseña" required />
          {/* <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div> */}
          
          {/* <Link to="/admin/dashboard"> */}
            <button className="btn btn-lg btn-primary btn-block botonSignIn" type="submit" onClick={this.login}>Iniciar Sesión</button>
            
          {/* </Link> */}
          <p className="mt-5 mb-3 text-muted leyenda">&copy; 2020</p>
        </div>
      </form>
      </body>
      
      );
    
    
    
  }
}

export default Login;
