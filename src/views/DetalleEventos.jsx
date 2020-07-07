
import React, { Component, useState, useEffect } from "react";
import { Grid, Row, Col, Button, Modal, Dropdown} from "react-bootstrap";
import Pagination from '../components/Pagination/Pagination';
import Posts from '../components/Posts/Post';
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Card from "components/Card/Card.jsx";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
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
      linkFotos:"http://192.168.0.103/fotos/ftp/",
      urlFotos: "",
      currentPage:1,
      postsPerPage:50,
      posts: [],
      currentPosts: [],
      isLoaded: false,
      isLoading:false,
      hayDatos: true
    }
    this.handleChangePorPagina = this.handleChangePorPagina.bind(this)
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.cambiarPagina = this.cambiarPagina.bind(this)
  }
  
  
  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({linkFotos: user.link_fotos})
    //console.log("SE HACE LA PETICION API")
    this.getDatosDetalleEventos();
  }

 

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  
  async getDatosDetalleEventos(){
    console.log("GET DETALLE")
    let respuestaApi = await this.peticionApi();
    if (respuestaApi.length == 0) {
      this.setState({hayDatos: false, isLoaded:true})
      return
    }
    else{
      this.setState({hayDatos: true})
    }
    let arrayJsx = [];
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log("PRIMER PAGINA", indexOfFirstPost)
    const currentPosts = respuestaApi.slice(indexOfFirstPost, indexOfLastPost);

    
    this.setState({posts: respuestaApi,currentPosts: currentPosts, isLoaded:true}) 
    
  }
  
  peticionApi(fecha,fechaHoraDesde,fechaHoraHasta) {
    console.log("PARAMS", fecha)
    if (fecha == undefined) {
      var fechaHoy = moment().format("YYYY-MM-DD");
    }
    else{
      var fechaHoy = moment(fecha).format("YYYY-MM-DD");
    }
    if (fechaHoraDesde == undefined || fechaHoraHasta == undefined){
      var horaDesde = "00:00:00"
      var horaHasta = "23:59"
    }
    else{
      var horaDesde = fechaHoraDesde
      var horaHasta = fechaHoraHasta
    }
      
    let user = JSON.parse(localStorage.getItem('user'))
    var url = "http://chaco.teledirecto.com:3003/tdr/"+fechaHoy+"/"+horaDesde+"/"+fechaHoy+"/"+horaHasta+"/"+user.user+"/"+user.entidad+""
    //
    console.log("URL",url)
    const fetchData = fetch(url)
    .then(res => res.json())
    .then((data) => {
      return data
    })
    .catch(console.log);

  return fetchData
    //this.obtenerURLfotos();
  }

  async getDetallesPorFecha(fechaDesde){
    this.setState({isLoading:true})
    var fecha1 = moment(fechaDesde).format("YYYY-MM-DD");
    var fecha2 = moment(fechaDesde).add(1, 'd').format("YYYY-MM-DD");

    var hora1 = moment(fechaDesde).format("HH:mm:ss");
    var hora2 = moment(fechaDesde).add(1, 'h').format("HH:mm:ss");


    let respuestaApi = await this.peticionApi(fecha1);
    if (respuestaApi.length == 0) {
      this.setState({hayDatos: false,isLoading:false})
      return
    }
    else{
      this.setState({hayDatos: true})
    }
    console.log("respuesta api",respuestaApi)
    this.setState({ posts: respuestaApi })
    let arrayJsx = [];
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log("PRIMER PAGINA", indexOfFirstPost)
    const currentPosts = respuestaApi.slice(indexOfFirstPost, indexOfLastPost);

    
    this.setState({posts: respuestaApi,currentPosts: currentPosts, isLoading:false}) 
    // console.log("FECHA 1",fecha1);
    // console.log("FECHA 2",fecha2);

    // console.log("HORA 1", hora1);
    // console.log("HORA 1", hora2);

  }
  async getDetallesPorHora(fechaDesde){
    
    var fecha1 = moment(fechaDesde).format("YYYY-MM-DD");
    // var fecha2 = moment(fechaDesde).add(1, 'd').format("YYYY-MM-DD");

    var hora1 = moment(fechaDesde).format("HH:mm:ss");
    var hora2 = moment(fechaDesde).add(1, 'h').format("HH:mm:ss");

    // console.log("FECHA 1",fecha1);
    // console.log("FECHA 2",fecha2);
    let respuestaApi = await this.peticionApi(fecha1, hora1,hora2);
    if (respuestaApi.length == 0 || respuestaApi == undefined) {
      this.setState({hayDatos: false})
      return
    }
    else{
      this.setState({hayDatos: true})
    }
    //console.log("respuesta api",respuestaApi)

    this.setState({ posts: respuestaApi })
    let arrayJsx = [];
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log("PETICION POR HORA", indexOfFirstPost)
    const currentPosts = respuestaApi.slice(indexOfFirstPost, indexOfLastPost);

    
    this.setState({posts: respuestaApi,currentPosts: currentPosts, isLoaded:true}) 
    // console.log("FECHA 1",fecha1);
    // console.log("FECHA 2",fecha2);

    // console.log("HORA 1", hora1);
    // console.log("HORA 1", hora2);

    console.log("HORA 1", hora1);
    // console.log("HORA 1", hora2);

    // var url = "http://chaco.teledirecto.com:3003/tdr/"+fecha1+"/"+hora1+"/"+fecha1+"/"+hora2+"/juanm/89e495e7941cf9e40e6980d14a16bf023ccd4c91"
    // fetch(url)
    //     .then(res => res.json())
    //     .then((data) => {
    //       this.setState({ detalle: data })
          
    //     })
    //     .then(() => {
    //       console.log("PEticion por hora")
    //     })
    //     .catch(console.log)
    this.cambiarPagina(1);
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
  renderearPosts = (pageNumber) =>{
    console.log("NUMERO DE PAGINA",pageNumber )
    
    console.log("NUMERO DE PAGINA SIGUIENTE",this.state.currentPage )
    const indexOfLastPost = pageNumber * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    console.log("PRIMER PAGINA", indexOfFirstPost)
    const currentPosts =  this.state.posts.slice(indexOfFirstPost, indexOfLastPost);

    console.log("arrayJsxCortado")
    this.setState({currentPosts: currentPosts, isLoaded:true}) 
  }
  cambiarPagina =  (pageNumber) =>{
    //alert("cambiarPagina",typeof(pageNumber));
    this.setState({currentPage:pageNumber},this.renderearPosts(pageNumber));
  }
  handleChangePorPagina(event) {
    this.setState({value: event.target.value}, this.cambiarPagina(this.state.currentPage));
  }
  render() {
    
    // Change page
    const paginate = pageNumber => this.setState({currentPage: pageNumber});

    return (
      
      <div className="content detalleEventos">
        {
          this.state.isLoaded ? 
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
              <Col md={6}>
              <Card

                content={
                  <div style={{textAlign:'center', margin:'0px'}}>
                  <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.posts.length}
                    paginate={this.cambiarPagina}
                    style={{margin:'0px'}}
                    /> 
                  <hr style={{marginTop:'5px', marginBottom:'10px'}}/>
                  <label>
                    Resultados por pagina: 50
                    {/* <select value={this.state.postsPerPage} name="postsPerPage" onChange={this.handleChangePorPagina}>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select> */}
                  </label>

                  </div>
                }
                />
                
              </Col>
              
            </Row>
            
               
            <Row>
              {this.state.isLoading ?
              <div className="sweet-loading" style={{display:'flex'}}>
              <BeatLoader
                css={override}
                size={40}
                color={"#123abc"}
                loading={true}
              />
            </div>
            :
            <Posts hayDatos={this.state.hayDatos} posts={this.state.currentPosts}  handleShow={this.handleShow}/>
             
            }
             

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
