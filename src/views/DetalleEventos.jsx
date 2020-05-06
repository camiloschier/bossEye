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

fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)

class DetalleEventos extends Component {
  render() {
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
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
                  </div>
                }
              />
            </Col>
            <Col md={12}>
              <Card
                title="21/04/20 - 14:30:31"
                // category="Created using Roboto Font Family"
                content={
                  <div>
                    <p>Aplicacion:</p>
                    <p>Titulo:</p>
                    <p>Movimiento:</p>
                    <p>Calificación:</p>
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
