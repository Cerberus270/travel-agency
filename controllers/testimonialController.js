import { Testimonial} from '../models/Testimoniales.js'
import Sequelize from "sequelize";

const guardarTestimonial = async (req, res) => {
    // Validar...
    const {nombre, correo, mensaje} = req.body;

    console.log(req.body)

    const errores = [];

    if(nombre.trim() === ''){
        console.log('El nombre esta vacio');
        errores.push({mensaje: 'El Nombre esta vacio'});
    }
    if(correo.trim() === ''){
        errores.push({mensaje: 'El Correo esta vacio'});
    }
    if(mensaje.trim() === ''){
        errores.push({mensaje: 'El Mensaje esta vacio'});
    }

    if(errores.length > 0){
        // Consultar los testimoniales
        const testimoniales = await Testimonial.findAll({order: Sequelize.literal('rand()')});

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
};