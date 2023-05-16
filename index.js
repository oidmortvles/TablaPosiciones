/* import express from 'express';
import { agregarEstado } from './mongo.js'; */

const express = require('express');
const agregarEstado = require('./mongo.js');



const app = express();

app.set('views','./vistas');
app.set('view engine','ejs');
app.use(express.static('./estilos'));
app.use(express.urlencoded({extended:true}));


app.listen('8000',(req,res)=>{
    console.log('aplicacion en http://localhost:8000');
});


//creacion de rutas
app.get('/',(req,res)=>{
    res.render('index');
});

app.post('/',(req,res)=>{
    agregarEstado(); 
    res.redirect('/'); 
});