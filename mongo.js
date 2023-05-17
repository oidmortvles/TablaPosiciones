/* import mongoose from 'mongoose';
import * as cheerio from 'cheerio';
import * as request from 'request'; */


const request= require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');



//conexion a Db
const connect = 'mongodb+srv://danielper:grandeur22@cluster0.szlu8uy.mongodb.net/tabla_posiciones?retryWrites=true&w=majority';
mongoose.connect(connect,{ useNewUrlParser: true, useUnifiedTopology: true });

//esquema y modelo de la Db
const {Schema} = mongoose;
    
//creacion del modelo a insertar dentro de la Db
const datos= new Schema({
    puesto: [Number],
    escudo: [String],
    cuadro: [String],
    partidos_jugados : [Number],
    ganados: [Number],
    empatados : [Number],
    perdidos: [Number],
    goles_favor: [Number],
    goles_contra : [Number],
    diferencia_goles : [Number],
    puntos_totales : [Number]});

const Equipos = mongoose.model('equipos',datos);


//creo arrays por cada elemento que necesito guardar y completar
var puesto=[];
var escudo= [];
var cuadro=[];
var partidos_jugados=[];
var ganados= [];
var empatados= [];
var perdidos= [];
var goles_favor= [];
var goles_contra= [];
var diferencia_goles=[];
var puntos_totales=[];



//hace la request a la pagina, le pasa el encoder y con una funcion que captura el ERR, RESP y BODY.
request({url:'https://www.futbolargentino.com/primera-division/tabla-de-posiciones',encoding: 'utf-8'}, 
    function(err,resp,body){
        if(!err && resp.statusCode==200){
            
            //alojamos la utilidad de Cheerio.
            //hace el pedido Jquery de Cheerio para traer los datos que indicamos del Body que citamos antes.
            var $ =cheerio.load(body);       

    
            //guardo cada dato por separado para poder operarlo despues haciendo un push a los arrays ya creados.
            $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr').each(function(){
                puesto.push($(this).find('td:nth-of-type(1)').html());
                escudo.push($(this).find('img').attr('data-src'));
                cuadro.push($(this).find('span.d-md-inline').html());
                partidos_jugados.push($(this).find('td:nth-of-type(3)').html());
                ganados.push($(this).find('td:nth-of-type(4)').html());
                empatados.push($(this).find('td:nth-of-type(5)').html());
                perdidos.push($(this).find('td:nth-of-type(6)').html());
                goles_favor.push($(this).find('td:nth-of-type(7)').html());
                goles_contra.push($(this).find('td:nth-of-type(8)').html());
                diferencia_goles.push($(this).find('td:nth-of-type(9)').html());
                puntos_totales.push($(this).find('td:nth-of-type(10)').html());    
                        

                    
            });
    
        }
    });


//funcion de agregar el modelo a la db
const agregarEstado=async () => {
    try {

        //creo el objeto que guardare en la DB.
        const estadoEquipos = new Equipos({
            puesto: puesto,
            escudo: escudo,
            cuadro: cuadro,
            partidos_jugados : partidos_jugados,
            ganados: ganados,
            empatados : empatados,
            perdidos: perdidos,
            goles_favor: goles_favor,
            goles_contra : goles_contra,
            diferencia_goles : diferencia_goles,
            puntos_totales : puntos_totales,
            
            });;

      await estadoEquipos.save();
      console.log('Datos guardados en MongoDB');
      //console.log(puntos_totales[0]);
    } catch (error) {
      console.error('Error al guardar los datos en MongoDB', error);
    }
  };


//funcion que carga los datos obtenidos del Scrapping

const traerTabla = async(modelo) => {
    try {
        const estado = await modelo.find({});
        return estado;
      } catch (error) {
        console.error(error);
        throw error;
      }

}



module.exports ={agregarEstado : agregarEstado, traerTabla : traerTabla , Equipos:Equipos};