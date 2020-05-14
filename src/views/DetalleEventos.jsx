
import React, { Component } from "react";
import { Grid, Row, Col, Button, Modal} from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import ReactTooltip from "react-tooltip";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // the locale you want

import "react-datepicker/dist/react-datepicker.css";
registerLocale("es", es); // register it with the name you want

//import '../assets/css/styles.css';
var moment = require('moment');
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class DetalleEventos extends Component {
  constructor(props){
    super(props);
    this.state = {
      detalle: [],
      startDate: new Date(),
      show: false,
      linkFotos:"http://160.160.160.27/fotos/ftp/",
      urlFotos: "",
  
    }
    this.handleClose = this.handleClose.bind(this);
  }
  
  
  componentDidMount(){
    this.peticionApi();
  }
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  
  
  peticionApi(params) {
    var url = "http://chaco.teledirecto.com:3003/tdr/2020-05-07/15:00:00/2020-05-07/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ detalle: data })
          
        })
        .catch(console.log)
    
  }

  getDetallesPorFecha(fechaDesde){
    
    var fecha1 = moment(fechaDesde).format("YYYY-MM-DD");
    var fecha2 = moment(fechaDesde).add(1, 'd').format("YYYY-MM-DD");

    var hora1 = moment(fechaDesde).format("HH:mm:ss");
    var hora2 = moment(fechaDesde).add(1, 'h').format("HH:mm:ss");

    // console.log("FECHA 1",fecha1);
    // console.log("FECHA 2",fecha2);

    // console.log("HORA 1", hora1);
    // console.log("HORA 1", hora2);

    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha1+"/00:00:00/"+fecha1+"/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ detalle: data })
          
        })
        .then(() => {
          console.log("2da peticion")
        })
        .catch(console.log)
  }
  getDetallesPorHora(fechaDesde){
    
    var fecha1 = moment(fechaDesde).format("YYYY-MM-DD");
    // var fecha2 = moment(fechaDesde).add(1, 'd').format("YYYY-MM-DD");

    var hora1 = moment(fechaDesde).format("HH:mm:ss");
    var hora2 = moment(fechaDesde).add(1, 'h').format("HH:mm:ss");

    // console.log("FECHA 1",fecha1);
    // console.log("FECHA 2",fecha2);

    console.log("HORA 1", hora1);
    // console.log("HORA 1", hora2);

    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha1+"/"+hora1+"/"+fecha1+"/"+hora2+"/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ detalle: data })
          
        })
        .then(() => {
          console.log("PEticion por hora")
        })
        .catch(console.log)
  }

  localizarFecha(fecha, timezone,formato){
    let fechaLocal = moment(fecha).utc();
    let desviacion = parseInt(timezone);
  
    // console.log("Fecha:", fechaLocal.format('DD-MM-YYYY, HH:mm') + " TimeZone: ", desviacion)
  
    // console.log("SUMA",fechaLocal.add(desviacion, 'hours').format('DD-MM-YYYY, HH:mm'))

    return fechaLocal.add(desviacion, 'hours').format(formato)
  }
  
  handleShow(url){
    
    this.setState({show:true , urlFotos:url})
  }
  handleClose(){
    this.setState({show:false})
  }
  
  render() {

    return (

      <div className="content detalleEventos">
        {
          this.state.detalle.length > 0 ? 
            <Grid fluid>
           
            
            <Row>
              <Col md={3}>
              <Card
              
              content={
                  <div style={{textAlign:'center'}}>
                  
                  <DatePicker
                      locale="es"
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      
                      
                      
                      dateFormat="MMMM d, yyyy "
                  />
                  <hr/>
                  <Button variant="primary" style={{marginLeft:'10px'}} onClick={() => this.getDetallesPorFecha(this.state.startDate)}>
                    BUSCAR POR FECHA
                  </Button>
                  
                  </div>
              }

              />
              </Col>
              <Col md={3}>
                <Card

                  content={
                    <div style={{textAlign:'center'}}>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                    />
                    <hr/>
                    <Button  variant="primary" style={{marginLeft:'10px'}} onClick={() => this.getDetallesPorHora(this.state.startDate)}>
                      BUSCAR POR HORA
                    </Button>
                    </div>
                  }
                />
              </Col>
              
            </Row>
            
               
            <Row>

              {this.state.detalle.map(det =>
              <Col md={12}>
                   <Card
                    // title={this.localizarFecha(det.fecha,det.zona_h,'HH:mm')+" - "+ det.aplicacion}
                    // category="Created using Roboto Font Family"
                    content={
                    
                    <div className="tarjeta-detalles">
                      <div className="tarjeta-detalles-texto">
                        
                        <p>Aplicacion: {det.aplicacion}</p>
                        
                        <p data-tip={det.titulo} className="tarjeta-detalles-texto-titulo">Titulo: {(det.titulo)}</p>
                        <ReactTooltip />
                        <p className="tarjeta-detalles-texto-iconos">
                          <span><i class="fas fa-clock"></i> {this.localizarFecha(det.fecha,det.zona_h,'DD-MM-YY HH:mm')}</span>  
                          <span><i class="fas fa-mouse"></i> {det.mov_det == 1 ? <b style={{color:'green'}}>SI</b> : <b style={{color:'red'}}>NO</b>}</span> 
                          <span><i class="fas fa-keyboard"></i> <b></b>{ det.press == 1 ? <b style={{color:'green'}}>{det.count}</b> : <b style={{color:'red'}}>NO</b>}</span>
                        </p>
                        
                      </div>

                      <div className="tarjeta-detalles-texto">
                        <p>Calificación: <b>{det.calificacion == null ? "Desconocido" : det.calificacion}</b></p>
                        <p>Link: <a href="#" onClick={() => this.handleShow(det.print_scr)}>Imagen</a> </p>
                        <p>Latencia: <b>{det.latency}</b></p>
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
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ACA VA LA IMAGEN */}
          <a href={this.state.linkFotos+this.state.urlFotos}  target="_blank"><img src={this.state.linkFotos+this.state.urlFotos} alt="foto" width="100%" height="100%"/></a>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default DetalleEventos;
