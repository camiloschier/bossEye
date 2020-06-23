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

import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es"; // the locale you want
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

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

// var moment = require('moment');
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es');
registerLocale("es", es);
let data = [
  {
    uv: 4000, pv: 2400, amt: 2400
  },
  
];
var createReactClass = require('create-react-class');
const CustomizedLabel = createReactClass({
    
  render () {
    const {x, y, fill, value,color} = this.props;
   	return <text 
               x={x} 
               y={y} 

               fontSize='16' 
               fontFamily='sans-serif'
               fill={color}
               textAnchor="start">{value}%</text>
  }
});




let dataPie = {
  labels: ["40%", "50%", "10%"],
  series: [40, 50, 10]
};
let legendPie = {
  names: ["Tarea", "Distraccion", "Comunicacion"],
  types: ["info", "danger", "warning"]
};
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      //Estos son objetos del dia
      datosApi: [],

      //DatePicker
      startDate: new Date("May 14, 2020"),
      isLoaded: false,
      isLoading:false,
      elementosHora: [],
      flagHora: false,
      nombreUsuario:"",
      hayDatos: true,
      
    }
  }
 
  createLegend(json) {
    //console.log("JSON", json)
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />," ",json["names"][i]);
      // legend.push(" ");
      // legend.push(json["names"][i]);
    }

    // console.log("LEYENDA", legend)
    return legend;

  }
  
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  componentDidMount(){
    let localestore = JSON.parse(localStorage.getItem('user'))
    this.setState({nombreUsuario: localestore.nombre})
   

    let fecha = moment().format("YYYY-MM-DD");
    
    this.getDatosDiarios(fecha);
    this.getDatosHora(fecha);
    //this.cargarChart();
    //this.buscarPorFecha(fecha)
  }

  async buscarPorFecha(fecha){

    this.setState({elementosHora:[],isLoading: true})
    //Con la promesa hacemos un timeout, para hacer las transiciones mas suaves
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.getDatosDiarios(fecha);
    this.getDatosHora(fecha);
    this.setState({ isLoading: false})

  }
  // Refactor
  async getDatosDiarios(fecha){
    //console.log("Se ejecuto getdatosdiarios")
    let fechaActual = moment(fecha).format("YYYY-MM-DD");
    //console.log(fechaActual)
    let arrayDatos = await this.peticionApi(fechaActual)
    
    if (arrayDatos.lenght == 0) {
      this.setState({hayDatos: false, isLoaded:true})
      return
    }
    this.setState({hayDatos:true})

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

    //console.log("Etiquetas", etiquetas);
    // console.log("Cantidades", cantidades);

    //cuento cuantos items hay en todo el arreglo
    let sumaCantidades = 0;
    cantidades.forEach(item => sumaCantidades += item)
    // console.log("Cantidad items",sumaCantidades)

    //calculo el porcentaje que representa cada elemento del array 
    let etiquetasPorcentaje = []
    cantidades.forEach(item => etiquetasPorcentaje.push(String(Math.round(item*100/sumaCantidades))+"%"))
    
    let objetoDatosDiarios = {
      labels: etiquetasPorcentaje,
      series: cantidades
    };

    let legendDatosDiarios = {
      names: etiquetas,
      types: ["info", "danger", "warning"]
    };

    //console.log("objetoDatosDiarios", objetoDatosDiarios)


    this.setState({objetoDatosDiarios: objetoDatosDiarios, legendDatosDiarios: legendDatosDiarios, isLoaded:true})

  }
  
  async getDatosHora(fecha){
    //MODIFICAR FUNCION PARA QUE A PARTIR DE LA HORA INICIO Y HORA FIN CALCULE LAS HORAS Y CICLE CADA UNA HORA DE ESO
   
    let fechaActual = moment(fecha).format("YYYY-MM-DD");
    // console.log("Se ejecuto getdatoshras en fecha",moment(fecha).format("HH:mm"))
    // console.log(fechaActual)
    let arrayDatos = await this.peticionApi(fechaActual);

    //console.log("ARRAY DATOS", arrayDatos)
    //a partir de aca calculo diferencia entre las horas
    if (arrayDatos.length == 0) {
      this.setState({hayDatos: false, isLoaded:true})
      return
    }
    //obtengo la hora de base del primero, esta en formato +0 GMT
    let horaInicioPrimerElementoArray = moment(arrayDatos[0].fecha).add(3,'hours')
    // ahora tengo que juntar todos los datos que sean menores a la primer hora y 59 min y 59 seg
    
    let horaFinPrimerElemento = moment(arrayDatos[0].fecha).minutes(59).seconds(59)
    // console.log("Primer hora final",horaInicioPrimerElementoArray)
    // console.log("Primer hora final",horaFinPrimerElemento)

    // con horafin primer elemento tengo que hacer un ciclo for y capturar 
    // todos los elementos que sean mayores a horaInicioPrimerElementoArray y menores a
    // horaFinPrimerElemento, luego incrementar una hora hasta la hora fin
    let subArray = []
    let subArrayTemp = []
    for (const iterator of arrayDatos) {
      //si los elementos estan entre horainicio y hora fin, meterlos a un array
      
      if( (horaFinPrimerElemento.isAfter(moment(iterator.fecha),'seconds')) ){
        //console.log(iterator)
        //con este itero sobre los que no mete
        //console.log("subArrayTemp",subArrayTemp.filter(el =>  (horaFinPrimerElemento.isAfter(moment(el.fecha),'seconds') ) ) )
        // horaFinPrimerElemento.subtract(1,'minute')
        //console.log(moment(iterator.fecha).toString())
        subArray.push(iterator)
        console.log("SubArrayHora",subArray)

        //En el subarray tengo todos los datos de una hora
      }
      
      else{
        //console.log("subarray",subArray)
        //console.log("subArrayTemp",subArrayTemp)
        
        console.log(iterator.id,"NO ES ANTERIOR A HORAFIN",moment(iterator.fecha).utc().toString())
        console.log("HORA FIN PRIMER ELEMENTO",horaFinPrimerElemento.utc().toString())
        //puedo capturar los que no entran, en un array temporal
        
        console.log("SubArrayHora",subArray)
        
        subArray = []
        horaFinPrimerElemento = horaFinPrimerElemento.add(1,'hour')
      }
      
    //aca ya puedo armar las horas, se salta 2 o 3 elementos


    }


    
    
    
    
    
    
    
    
    let ultimaHora = moment(arrayDatos[arrayDatos.length-1].fecha).format("HH:mm")
    
    //console.log("Ultima hora",ultimaHora)

    
    //console.log("arrayDatos",arrayDatos)
    //divido el array en 60
    let horasEnArray = Math.ceil(arrayDatos.length / 60)
    
    //console.log(horasEnArray)
    
    let copiaArrayDatos = arrayDatos
    // console.log("arrayDatos",arrayDatos)
    for (let index = 0; index < horasEnArray; index++) {
      
      let arrayDatosHora = arrayDatos.slice(0,59)
      // console.log("ARRAY HORA", arrayDatosHora)
      //obtengo primer hora array
      //console.log("PRIMER HORA", )
      

      //a partir de esto genero las etiquetas y labels necesarios
      //devuelvo para a partir de eso generar los reportes de cada una
      let etiquetas = []

      for (let index = 0; index < arrayDatosHora.length; index++) {
        const element = arrayDatosHora[index];

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
      let cantidades =[]
      //2do recorro el array original y cuento cantidades
      for (let index = 0; index < etiquetas.length; index++) {
        // console.log("ETIQUETA ES", etiquetas[index])
        let pruebas = arrayDatos.filter(elem => elem.calificacion == etiquetas[index])
        
        cantidades.push(pruebas.length)
      }
      //console.log("CANTIDADES", cantidades)
      //cuento cuantos items hay en todo el arreglo
      let sumaCantidades = 0;
      cantidades.forEach(item => sumaCantidades += item)
      // console.log("Cantidad items",sumaCantidades)

      //calculo el porcentaje que representa cada elemento del array 
      let etiquetasPorcentaje = []
      cantidades.forEach(item => etiquetasPorcentaje.push(String(Math.round(item*100/sumaCantidades))+"%"))
      // console.log("Cantidades", cantidades);
      // console.log("Etiquetas Porcentaje", etiquetasPorcentaje);

      //ahora que tengo los datos, deberia armar el objeto y pasarselo a una funcion que lo renderee
      

      let objetoDatosHora = {
        labels: etiquetasPorcentaje,
        series: cantidades
      };
      // console.log("Objeto datos hora", objetoDatosHora)
      // etiquetas = etiquetas.sort()
      //types me define la clase que luego define el color
      
      let legendDatosHora = {
        names: etiquetas,
        types: ["danger", "info", "warning"]
      };
      //console.log("LEGENDDATOSHORA", legendDatosHora)
      let key = index
      this.renderHora(objetoDatosHora,legendDatosHora,arrayDatosHora[0].fecha.substr(11,8),arrayDatosHora.slice(-1)[0].fecha.substr(11,8),key, arrayDatosHora[0].fecha, arrayDatosHora.slice(-1)[0].fecha)



      //lo elimino una vez que realice los datos
      arrayDatos.splice(0,59)
      
      // console.log("NUEVO ARRAY",arrayDatos)
      // console.log("ETIQUETAS HORA", etiquetas)


      }

      
  }

  renderHora2(){

    let data = [
      {
        uv: 4000, pv: 2400, amt: 2400,
      },
      
    ];

      // <BarChart
      //   width={300}
      //   height={100}
      //   data={data}
       
      //   layout="vertical" 
      // >
      //   <XAxis type="number" hide="true"/>
      //   <YAxis type="category" dataKey="name" hide="true"/>
      //   <Tooltip />
      //   {/* <Legend /> */}
      //   <Bar dataKey="pv"  stackId="a" fill="#8884d8" />
      //   <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
      //   <Bar dataKey="uv" stackId="a" fill="#ffc658" />
      // </BarChart>
  }

  localizarFecha(fecha, timezone,formato){
    let fechaLocal = moment(fecha).utc();
    let desviacion = parseInt(timezone);
  
    // console.log("Fecha:", fechaLocal.format('DD-MM-YYYY, HH:mm') + " TimeZone: ", desviacion)
  
    // console.log("SUMA",fechaLocal.add(desviacion, 'hours').format('DD-MM-YYYY, HH:mm'))

    return fechaLocal.add(desviacion, 'hours').format(formato)
  }


  renderHora(objetoData,leyendaData, horaInicio, horaFin, key,fechaInicio,fechaFin){
    //let m = moment(horaInicio);
    // let m = moment(fechaInicio);
    // let roundDown = m.startOf('hour');
    // console.log("HoraInicio", roundDown.toString())

    //console.log("fechaFin",fechaFin)
    //console.log("fechaFin redondeada",moment(fechaFin).endOf('hour').add(3,'hours').toString().substr(15,6))
    moment(fechaInicio).startOf('hour').add(3,'hours').toString().substr(15,6)

    // console.log("ARRAYS",objetoData)
    
    this.state.elementosHora.push(
      <Col md={4} lg={4} key={key}>
      <div
        id="chartPreferences"
        className="ct-chart ct-perfect-fourth"
      >
      <Card
                
                title={"Usuario:", this.state.nombreUsuario}
                // showTitle={true}
                // category="Reporte Diario Total"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <>
                      <div className="titulo-reporte">{moment(fechaInicio).startOf('hour').add(3,'hours').toString().substr(15,6)} - {moment(fechaFin).endOf('hour').add(3,'hours').toString().substr(15,6)}</div>

                  <div style={{display:'flex', justifyContent:'center'}}>
                  
                    <div>
                      <div className="nombre-usuario-reporte">Usuario: {this.state.nombreUsuario} </div>
                      <div style={{display:'flex',flexDirection:'column'}}>{this.createLegend(leyendaData)}</div>
                    </div>
                      
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      
                      <ChartistGraph  data={objetoData} 
                                        options={{
                                            
                                          }} 
                                        type="Pie"/>
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
      {/* {this.createLegend(this.state.legendDatosDiarios)} */}

    </div>
    </Col>
    )


    this.setState({flagHora: true, isLoading: false})
    // console.log("ELEMENTOS HORA", this.state.elementosHora)
    
  }
  peticionApi(fecha){

    let datosArray = []
    let user = JSON.parse(localStorage.getItem('user'))
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha+"/00:00:00/"+fecha+"/23:59:00/"+user.user+"/"+user.entidad+""
    
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
              <Col md={4}>
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
                  <Button variant="primary" style={{marginLeft:'10px'}} onClick={() => this.buscarPorFecha(this.state.startDate)}>
                    BUSCAR POR FECHA
                  </Button>
                  
                  </div>
              }

              />
              </Col>
          
            
            <Col md={6}>
              <Card
                
                //title={"Usuario:"}
                // showTitle={true}
                // category="Reporte Diario Total"
                // statsIcon="fa fa-clock-o"
                // stats="Campaign sent 2 days ago"
                content={
                  <>
                  <div style={{display:'flex', justifyContent:'center'}}>
                    {
                      !this.state.isLoading ?
                    
                    <>
                      {this.state.hayDatos 
                      ?
                      <>
                      <div>
                      <div className="titulo-reporte">Reporte Diario</div>
                      <div className="nombre-usuario-reporte">Usuario: {this.state.nombreUsuario} </div>
                      <div style={{display:'flex',flexDirection:'column'}}>{this.createLegend(this.state.legendDatosDiarios)}</div>
                    </div>
                      
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                    <ChartistGraph data={this.state.objetoDatosDiarios} type="Pie"/>
                      {/* {this.createLegend(this.state.legendDatosDiarios)} */}
                    </div>
                    </>
                    :
                    <div className="titulo-reporte">No hay datos para esta fecha</div>
                    }
                      
                    </>
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
                      <div className="titulo-reporte">Reporte por horas - {moment(this.state.startDate).lang("ES").format('LL')}</div>
                      <div className="nombre-usuario-reporte">Usuario: {this.state.nombreUsuario} </div>

                      {
                        this.state.hayDatos ?
                          this.state.isLoading ?
                          <div className="sweet-loading">
                    <BeatLoader
                      css={override}
                      size={40}
                      color={"#123abc"}
                      loading={true}
                    />
                  </div>
                          :
                          <div>
                          {this.state.elementosHora}
                          </div>
                        :
                        <Col md={12} xs={12} lg={12}>
          
          
          <div className="detalle-evento-alert-noDatos">
          
            <span>No hay datos de este periodo.</span>
          
          </div>
      

      
      </Col>
                      }
                      {/* {
                        
                      this.state.flagHora  ?
                      
                      
                      :
                      this.state.hayDatos ?
                        "cargando"
                      
                      :
                        "No hay datos para el periodo seleccionado"
                       } */}
                      
                  </div>
                
                
                
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
