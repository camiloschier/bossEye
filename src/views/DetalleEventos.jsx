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
import { Grid, Row, Col} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

import '../assets/css/styles.css';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class DetalleEventos extends Component {

  state = {
    detalle: []
  }
  componentDidMount(){
    this.peticionApi();
  }
  peticionApi(params) {
    var url = "http://chaco.teledirecto.com:3003/tdr/2020-05-07/15:00:00/2020-05-07/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ detalle: data })
          
        })
        .catch(console.log)
    
  }

  renderDetalle = detalle => {
    
  }
  // renderDetalle(){
  //   console.log(this.state.detalle.lenght)
  //   return(
  //   <Col md={12}>
  //     <Card
  //       title="21/04/20 - 14:30:31"
  //       // category="Created using Roboto Font Family"
  //       content={
  //         <div>
  //           <p>Aplicacion: {this.state.detalle[0].detalle} | Titulo: Facebook</p>
  //           <p>Movimiento Mouse: SI | Movimiento Teclado: NO </p>
  //           <p>Calificación: Comunicacion</p>
  //         </div>
  //       }
  //     />
  //   </Col>
  //   )
    
  // }
  
  
  
  render() {

    return (

      <div className="content">
        {
          this.state.detalle.length > 0 ? 
            <Grid fluid>
              
            <Row>

              {this.state.detalle.map(det =>
              <Col md={12}>
                   <Card
                    title={(det.fecha)}
                    // category="Created using Roboto Font Family"
                    content={
                    <div className="tarjeta-detalles">
                      <div className="tarjeta-detalles-texto">
                        <p>Aplicacion: { det.aplicacion} </p>
                        <p>Titulo: {(det.titulo.substring(0,54)+"..")}</p>
                        <p>Movimiento Mouse: {det.mov_det == 1 ? 'SI' : 'NO'} | Movimiento Teclado: { det.press == 1 ? 'SI' : 'NO' }</p>
                        <p>Calificación: {det.calificacion == null ? "Desconocido" : det.calificacion}</p>
                      </div>
                      <div className="tarjeta-detalles-imagen">
                        
                      </div>
                    </div>
                      
                    }
                  >
                      
                  </Card>
                </Col>
                
              )}
              

            </Row>
          </Grid>
          :
          <div className="sweet-loading">
          <BeatLoader
            css={override}
            size={40}
            color={"#123abc"}
            loading={true}
          />
        </div>

      
        }
        
      </div>
    );
  }
}

export default DetalleEventos;
