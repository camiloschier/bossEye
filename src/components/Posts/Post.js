import React from 'react';
import { Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import ReactTooltip from "react-tooltip";

let moment = require('moment');
const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  
    const localizarFecha = (fecha,timezone,formato) => {
        let fechaLocal = moment(fecha).utc();
        let desviacion = parseInt(timezone);

        // console.log("Fecha:", fechaLocal.format('DD-MM-YYYY, HH:mm') + " TimeZone: ", desviacion)

        // console.log("SUMA",fechaLocal.add(desviacion, 'hours').format('DD-MM-YYYY, HH:mm'))

        return fechaLocal.add(desviacion, 'hours').format(formato)
    }
  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
            <Col md={12} key={post.id}>
                    <Card
                    // title={this.localizarFecha(post.fecha,post.zona_h,'HH:mm')+" - "+ post.aplicacion}
                    // category="Created using Roboto Font Family"
                    content={
                    
                    <div className="tarjeta-detalles">
                    <div className="tarjeta-detalles-texto">
                        
                        <p>Aplicacion: {post.aplicacion}</p>
                        
                        <p data-tip={post.titulo} className="tarjeta-detalles-texto-titulo">Titulo: {(post.titulo)}</p>
                        <ReactTooltip />
                        <p className="tarjeta-detalles-texto-iconos">
                        <span><i className="fas fa-clock"></i> {localizarFecha(post.fecha,post.zona_h,'DD-MM-YY HH:mm')}</span>  
                        <span><i className="fas fa-mouse"></i> {post.mov_det == 1 ? <b style={{color:'green'}}>SI</b> : <b style={{color:'red'}}>NO</b>}</span> 
                        <span><i className="fas fa-keyboard"></i> <b></b>{ post.press == 1 ? <b style={{color:'green'}}>{post.count}</b> : <b style={{color:'red'}}>NO</b>}</span>
                        </p>
                        
                    </div>

                    <div className="tarjeta-detalles-texto">
                        <p>Calificación: <b>{post.calificacion == null ? "Desconocido" : post.calificacion}</b></p>
                        <p>Link: <a href="#" onClick={() => this.handleShow(post.print_scr)}>Imagen</a> </p>
                        <p>Latencia: <b>{post.latency}</b></p>
                    </div>
                    
                    </div>
                    
                    }
                >
                
            </Card>
</Col>
      ))}
    </ul>
  );
};

export default Posts;