//iniciar Express y otras dependencias
//import express from 'express';

//const app= express();
const request= require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

//configuramos la base de datos.
//mongoose.connect('mongodb+srv://danielper:grandeur22@cluster0.szlu8uy.mongodb.net/?retryWrites=true&w=majority',
//{userNewUrlParser:true, useUnifiedTopology:true});

/* var datosModel = mongoose.model('equipos',{
    puesto: Number,
    equipo: String,
    partidos_jugados : Number,
    ganados: Number,
    empatados : Number,
    perdidos: Number,
    goles_favor: Number,
    goles_contra : Number,
    diferencia_goles : Number,
    puntos_totales : Number,
    escudo: String
}); */




//hace la request a la pagina, le pasa el encoder y con una funcion que captura el ERR, RESP y BODY.
request({url:'https://www.futbolargentino.com/primera-division/tabla-de-posiciones',encoding: 'binary'}, 
function(err,resp,body){
    if(!err && resp.statusCode==200){
        
        //alojamos la utilidad de Cheerio.
        //hace el pedido Jquery de Cheerio para traer los datos que indicamos del Body que citamos antes.
        var $ =cheerio.load(body);      
        

        //traigo cada dato por separado para poder operarlo despues.

        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(1)').each(function(){
            var puesto= $(this).html();
            console.log(puesto);
        });

        
        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td a img.ls-is-cached').each(function(){
            var escudo= $(this).html();
            //console.log(escudo);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td a span.d-md-inline').each(function(){
            var cuadro= $(this).html();
            //console.log(cuadro);
        });



        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(3)').each(function(){
            var partidos_jugados= $(this).html();
            //console.log(partidos_jugados);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(4)').each(function(){
            var ganados= $(this).html();
            //console.log(ganados);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(5)').each(function(){
            var empatados= $(this).html();
            //console.log(empatados);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(6)').each(function(){
            var perdidos= $(this).html();
            //console.log(perdidos);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(7)').each(function(){
            var goles_favor= $(this).html();
            //console.log(goles_favor);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(8)').each(function(){
            var goles_contra= $(this).html();
            //console.log(goles_contra);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(9)').each(function(){
            var diferencia_goles= $(this).html();
            //console.log(diferencia_goles);
        });


        $('#p_score_contenido_TorneoTabs_collapse3 .card-body .table tbody tr td:nth-of-type(10)').each(function(){
            var puntos_totales= $(this).html();
            //console.log(puntos_totales);
        });


        


        //creo el objeto que guardare en la DB.
        /* var datos = new datosModel({
        puesto: puesto,
        equipo: equipo,
        partidos_jugados : partidos_jugados,
        ganados: ganados,
        empatados : empatados,
        perdidos: perdidos,
        goles_favor: goles_favor,
        goles_contra : goles_contra,
        diferencia_goles : diferencia_goles,
        puntos_totales : puntos_totales,
        escudo: escudo
        });
 */



    }
});






