/* import express from 'express';
import { agregarEstado } from './mongo.js'; */

const express = require('express');
const funciones = require('./mongo.js');



const app = express();

app.set('views','./vistas');
app.set('view engine','ejs');
app.use(express.static('./estilos'));
app.use(express.urlencoded({extended:true}));


app.listen('8000',(req,res)=>{
    console.log('aplicacion en http://localhost:8000');
});


//creacion de rutas

app.get('/',async (req,res)=>{
    let estado = await funciones.traerTabla(funciones.Equipos);
    res.render('index',{estado});
});


app.post('/',(req,res)=>{
    funciones.agregarEstado(); 
    res.redirect('/'); 
});