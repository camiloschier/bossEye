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
let dataPie = {
  labels: ["40%", "50%", "10%"],
  series: [40, 50, 10]
};
let legendPie = {
  names: ["Tarea", "Distraccion", "Comunicacion"],
  types: ["info", "danger", "warning"]
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Estos son objetos del dia
      datosApi: [],

      //DatePicker
      startDate: new Date(),
      isLoaded: false,
    }
  }
 
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />," ",json["names"][i]);
      // legend.push(" ");
      // legend.push(json["names"][i]);
    }

    console.log("LEYENDA", legend)
    return legend;

  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount(){
    
    this.getDatosDiarios();
    //this.getDatosHora();

  }

  // Refactor
  async getDatosDiarios(){
    let fechaActual = moment().subtract(3,'d').format("YYYY-MM-DD");
    console.log(fechaActual)
    let arrayDatos = await this.peticionApi(fechaActual)

    //tengo el array y ahora lo necesito convertir a el objeto para los graficos

    let etiquetas = []

    for (let index = 0; index < arrayDatos.length; index++) {
      const element = arrayDatos[index];

      let calificacion = element.calificacion;
      let valor = 1;
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

    let cantidades =[]
    //2do recorro el array original y cuento cantidades
    for (let index = 0; index < etiquetas.length; index++) {
      // console.log("ETIQUETA ES", etiquetas[index])
      let pruebas = arrayDatos.filter(elem => elem.calificacion == etiquetas[index])
      
      cantidades.push(pruebas.length)
    }

    console.log("Etiquetas", etiquetas);
    // console.log("Cantidades", cantidades);

    //cuento cuantos items hay en todo el arreglo
    let sumaCantidades = 0;
    cantidades.forEach(item => sumaCantidades += item)
    // console.log("Cantidad items",sumaCantidades)

    //calculo el porcentaje que representa cada elemento del array 
    let etiquetasPorcentaje = []
    cantidades.forEach(item => etiquetasPorcentaje.push(item*100/sumaCantidades))
    
    let objetoDatosDiarios = {
      labels: etiquetasPorcentaje,
      series: cantidades
    };

    let legendDatosDiarios = {
      names: etiquetas,
      types: ["info", "danger", "warning"]
    };

    console.log("objetoDatosDiarios", objetoDatosDiarios)


    this.setState({objetoDatosDiarios: objetoDatosDiarios, legendDatosDiarios: legendDatosDiarios, isLoaded:true})

  }

  async getDatosHora(){
    let fechaActual = moment().subtract(3,'d').format("YYYY-MM-DD");
    console.log(fechaActual)
    let arrayDatos = await this.peticionApi(fechaActual);

    console.log(arrayDatos)
    //divido el array en 60
    let horasEnArray = Math.floor(arrayDatos.length / 60)

    console.log(horasEnArray)
    
    for (let index = 0; index < horasEnArray; index++) {
      let arrayDatosHora = arrayDatos.slice(0,59)
      console.log("ARRAY HORA", arrayDatosHora)

      //a partir de esto genero las etiquetas y labels necesarios
      //devuelvo para a partir de eso generar los reportes de cada una
    }
  }

  peticionApi(fecha){

    let datosArray = []
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha+"/00:00:00/"+fecha+"/23:59:00/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    
    const fetchData = fetch(url)
      .then(res => res.json())
      .then((data) => {
        return data
      })
      .catch(console.log);

    return fetchData
    
  }

  render() {
    return (
      <div className="content dashboard">
        <Grid fluid>
        
        { 
          
          this.state.isLoaded ?
          
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
          {/* </Row>
          <Row>    */}
            <Col md={6}>
              <Card
                
                title="Usuario: Camilo Perona"
                // showTitle={true}
                // category="Reporte Diario Total"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <>
                  <div style={{display:'flex', justifyContent:'center'}}>
                    <div>
                      <div className="titulo-reporte">Reporte Diario</div>
                      <div className="nombre-usuario-reporte">Usuario: Camilo Perona </div>
                      <div style={{display:'flex',flexDirection:'column'}}>{this.createLegend(this.state.legendDatosDiarios)}</div>
                    </div>
                      
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={this.state.objetoDatosDiarios} type="Pie"/>
                      {/* {this.createLegend(this.state.legendDatosDiarios)} */}
                    </div>
                  </div>
                  </>
                }
                // legend={
                //   <div className="legend">{this.createLegend(this.state.legendDatosDiarios)}</div>
                // }
                showFooter={true}
              />
              
            </Col>
            </Row>
            <Row>
              <Col md={12}>
              <Col md={12}>
                  <div>
                      <div className="titulo-reporte">Reporte por horas</div>
                      <div className="nombre-usuario-reporte">Usuario: Camilo Perona </div>
                  </div>
                <Card
                
                // title="Usuario: Camilo Perona"
                // showTitle={true}
                // category="Reportes Por hora"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <>
                  <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-evenly'}}>
                  <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center'}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                <Card
                  
                  title="Usuario: Camilo Perona"
                  showTitle={true}
                  category="Reporte Por hora"
                  // statsIcon="fa fa-clock-o"
                  // stats="Campaign sent 2 days ago"
                  content={
                    <div style={{display:'flex', justifyContent:'center',}}>
                    
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph data={dataPie} type="Pie"/>
                    </div>
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
                  showFooter={true}
                />
                </div>
                </>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
                showFooter={true}
                />
                
                
              </Col>
              </Col>
            </Row>
            </>
            :
            "CARGANDO"
          }
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
