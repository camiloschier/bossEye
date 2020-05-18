import  React, { Component } from 'react'

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

class Rutas extends Component{
    constructor(props){
        super(props);
        this.state = {
          // loggedInStatus: ""
          
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this)
      }
      componentDidMount(){
        let user = localStorage.getItem('user')
        console.log("USER", user)
        if (user != null ) {
          // alert("NOT LOGGED")
          this.setState({loggedInStatus: "LOGGED_IN"})
        }
        else{
          // alert("LOGGED")
          this.setState({loggedInStatus: "NOT_LOGGED_IN"})
        }
      }
      handleLogin(data) {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: data
        });
     
        localStorage.setItem('user', JSON.stringify(data));
      }
      handleLogout() {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        });
        localStorage.removeItem('user')
      }
    render(){
        //const isLoged = localStorage.getItem('login')
        //console.log("ISLOGED", isLoged)
        // alert(this.state.loggedInStatus)
        return(
          <BrowserRouter>
          <Switch>
              {
                
                this.state.loggedInStatus == "NOT_LOGGED_IN"
              ? 
                <>
                  <Route path="/loginScreen" render={props => <LoginScreen {...props}  handleLogin={this.handleLogin}/>} />
                  <Redirect from="/" to="/loginScreen" />
                </>
              :
              this.state.loggedInStatus == "LOGGED_IN" ?
              <>
                
                <Route  path="/admin" render={props => <AdminLayout {...props} handleLogout={this.handleLogout}/>} />
                <Redirect from="/loginScreen" to="/admin"/>
            
              </>
              :
              null
              }
              
        
              
              {/* // <Route path="/loginScreen" render={props => <LoginScreen {...props}  handleLogin={this.handleLogin}/>} /> */}
          </Switch>
        </BrowserRouter>
        )
    }
}

export default Rutas