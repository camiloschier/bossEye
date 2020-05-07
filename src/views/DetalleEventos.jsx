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
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";


class DetalleEventos extends Component {

  peticionApi(params) {
    var url = "http://chaco.teledirecto.com:3003/tdr/2020-05-03/15:00:00/2020-05-03/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch('http://chaco.teledirecto.com:3003/tdr/2020-05-03/15:00:00/2020-05-03/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91')
        .then(res => res.json())
        .then((data) => {
          console.log({data })
        })
        .catch(console.log)
  }

  
  
  render() {
    this.peticionApi()
    return (
      
      <div className="content">
        <Grid fluid>
          
          <Row>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion: Firefox | Titulo: Facebook</p>
                    <p>Movimiento Mouse: SI | Movimiento Teclado: NO </p>
                    <p>Calificación: Comunicacion</p>
                  </div>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default DetalleEventos;
