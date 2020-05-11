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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"; // the locale you want

import "react-datepicker/dist/react-datepicker.css";

import {
  
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
registerLocale("es", es);

var moment = require('moment');
var dataPie = {
  labels: ["40%", "50%", "10%"],
  series: [40, 50, 10]
};
var legendPie = {
  names: ["Tarea", "Distraccion", "Comunicacion"],
  types: ["info", "danger", "warning"]
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Estos son objetos del dia
      datosApi: [],

      objetoDatos: {
        labels: [],
        series: []
      },
      objetoLeyenda:{
        names: [],
        types: ["info","danger","warning"]
      },
      //Terminan objetos del dia
      datosApiHora: [],
      // tiposEtiquetas:[],
      // datosEtiquetas:[],
      //Estos son objetos de la hora
      objetoDatosHora: {
        labels: [],
        series: []
      },
      objetoLeyendaHora:{
        names: [],
        types: ["info","danger","warning"]
      },
      //Terminan objetos de la hora
  

      //DatePicker
      startDate: new Date(),
    }
  }
 
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount(){
    this.peticionApi();
    //this.getDatosDiarios();
    //this.getDatosHora();
  }

  getDatosDiarios(fecha){
    let fechaActual = moment(fecha).format("YYYY-MM-DD");

    //console.log("FECHA ACTUAL", fechaActual)

    this.peticionApiPorFecha(fechaActual);
  }

  getDatosHora(){
    let fechaActual = moment("05/10/2020").format("YYYY-MM-DD");
    let horaActual = moment("05/10/2020 16:30").format("HH:mm:ss");
    let horaActualMasUno = moment("05/10/2020 16:30").add(1, 'h').format("HH:mm:ss");
    console.log("HORA ACTUAL",horaActualMasUno);
    this.peticionApiPorHora(fechaActual,horaActual,horaActualMasUno)
  }
  peticionApi() {
    //ESTA ME DA EL DEL DIA ANTERIOR
    let fecha = moment().subtract(1,'d').format("YYYY-MM-DD");
    console.log("FECHA", fecha)
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha+"/00:00:00/"+fecha+"/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ datosApi: data })
          
        })
        .then( (datos) => {console.log("DATOS HORA",this.state.datosApiHora)})
        .then(() => this.obtenerEtiquetas())
        .catch(console.log)
    
  }
  peticionApiPorFecha(fecha) {
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha+"/00:00:00/"+fecha+"/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ datosApi: data })
          
        })
        .then( (datos) => {console.log("DATOS HORA",this.state.datosApiHora)})
        .then(() => this.obtenerEtiquetas())
        .catch(console.log)
    
  }

  peticionApiPorHora(fecha,horaDesde, horaHasta){
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha+"/"+horaDesde+"/"+fecha+"/"+horaHasta+"/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ datosApi: data })
          
        })
        .then( (datos) => {console.log("DATOS",this.state.datosApiHora)})
        // .then(() => this.obtenerEtiquetas())
        .catch(console.log)
    
  }

  //ESTE OBTIENE ETIQUETAS DEL DIA
  obtenerEtiquetas(){
    //1ero recorro el array y añado etiquetas
    let etiquetas = []

    

    for (let index = 0; index < this.state.datosApi.length; index++) {
      const element = this.state.datosApi[index];

      let calificacion = element.calificacion;
      let valor = 1
      //chequeo si el elemento está en el array, si no está lo añado
      if (!etiquetas.includes(element.calificacion)) {
        if (element.calificacion == null) {
          element.calificacion = "Desconocido"
          
          if(etiquetas.indexOf("Desconocido") == -1)
            {
              etiquetas.push(element.calificacion)
            }
        }
        else{
          etiquetas.push(element.calificacion)
        }
        
      }
    }
    //el array etiquetas queda cargado con las etiquetas
    
    this.setState({tiposEtiquetas: etiquetas})

    
    this.calcularCantidades(etiquetas)
  }


  //ESTE CALCULA CANTIDADES PARA EL DIA
  calcularCantidades(etiquetas){
    
    let cantidades =[]
    //2do recorro el array original y cuento cantidades
    for (let index = 0; index < etiquetas.length; index++) {
      // console.log("ETIQUETA ES", etiquetas[index])
      let pruebas = this.state.datosApi.filter(elem => elem.calificacion == etiquetas[index])
      
      cantidades.push(pruebas.length)
    }

    this.setState({datosEtiquetas: cantidades})

    //ETIQUETAS Y CANTIDADES ESTAN EN EL MISMO ORDEN
  

    //SETEO EL STATE DE: ObjetoDatos y ObjetoLeyenda
    this.setState({
      objetoDatos:{
        ...this.state.objetoDatos,
        labels: etiquetas,
        series: cantidades
      },
      objetoLeyenda:{
        ...this.state.objetoLeyenda,
        names: etiquetas
      }
    })

    console.log(this.state.objetoDatos)

    
  }


  //ESTOS OBTIENEN ETIQUETAS HORA
  obtenerEtiquetasHora(){
    //1ero recorro el array y añado etiquetas
    let etiquetas = []

    

    for (let index = 0; index < this.state.datosApiHora.length; index++) {
      const element = this.state.datosApi[index];

      let calificacion = element.calificacion;
      let valor = 1
      //chequeo si el elemento está en el array, si no está lo añado
      if (!etiquetas.includes(element.calificacion)) {
        if (element.calificacion == null) {
          element.calificacion = "Desconocido"
          
          if(etiquetas.indexOf("Desconocido") == -1)
            {
              etiquetas.push(element.calificacion)
            }
        }
        else{
          etiquetas.push(element.calificacion)
        }
        
      }
    }
    //el array etiquetas queda cargado con las etiquetas
    
    this.setState({tiposEtiquetas: etiquetas})

    
    this.calcularCantidades(etiquetas)
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
        
        {  
          this.state.datosApi.length > 0 ?
          <>
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
                  <Button variant="primary" style={{marginLeft:'10px'}} onClick={() => this.getDatosDiarios(this.state.startDate)}>
                    BUSCAR POR FECHA
                  </Button>
                  
                  </div>
              }

              />
              </Col>
          </Row>
          <Row>   
            <Col md={4}>
              <Card
                
                title="Usuario: Camilo Perona"
                showTitle={true}
                category="Reporte Diario Total"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    
                    <ChartistGraph data={this.state.objetoDatos} type="Pie"/>
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(this.state.objetoLeyenda)}</div>
                }
                showFooter={true}
              />
              {/* {this.calcularEstadistica()} */}
              
            </Col>
            <Col md={4}>
              <Card
                
                title="Usuario: Camilo Perona"
                showTitle={true}
                category="Reporte Por hora"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    
                    <ChartistGraph data={dataPie} type="Pie"/>
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
                showFooter={true}
              />
            </Col>
            </Row>
            </>
            :
            "CARGANDO"
   }
            {/* <Col md={4}>
              <Card
                
                title="Usuario: Camilo Perona"
                category="Performance"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
                showFooter={true}
              />
            </Col> */}
            
          
          {/* <Row>
            
            <Col md={3}>
              <Card
              
              content={
                <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Fecha",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Buscar usuario..",
                          
                        }
                        
                      ]}
                    />
              }

              />
            </Col>
            <Col md={3}>
              <Card
              
              content={
                <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Hora desde",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Buscar usuario..",
                          
                        }
                        
                      ]}
                    />
                    
                    
              }

              />
            </Col>
          </Row> */}
          

          
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
