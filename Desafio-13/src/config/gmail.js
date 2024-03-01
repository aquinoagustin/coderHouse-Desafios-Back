import nodemailer from 'nodemailer';
import {options} from './option.js';

// Credenciales
const adminEmail = options.gmail.adminAccount;
const adminPass = options.gmail.adminPass;

//Configurar el canal de comunicacion entre node y gmail

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPass
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
})

export {transporter};