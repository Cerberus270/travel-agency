import { Viaje } from "../models/Viajes.js";
import { Testimonial} from '../models/Testimoniales.js'
import Sequelize from "sequelize";

const paginaInicio = async (req, res) => { // req - lo que enviamos : res - lo que express nos respone

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({order: Sequelize.literal('rand()'),limit: 3}));
    promiseDB.push(Testimonial.findAll({order: Sequelize.literal('rand()'),limit: 3}));

    // Al hacerlo de esta manera no se optimiza de manera correcta la consulta

    /*const viajes = await Viaje.findAll({order: Sequelize.literal('rand()'),limit: 3});
    const testimoniales = await Testimonial.findAll({order: Sequelize.literal('rand()'),limit: 3});*/
    try {
        const resultado = await Promise.all(promiseDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    // Consultar BD
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (req, res) => { // req - lo que enviamos : res - lo que express nos responde
    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
    
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    
    try{
        const viaje = await Viaje.findOne({ where : { slug }});

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}