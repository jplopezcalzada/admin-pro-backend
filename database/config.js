const mongoose = require('mongoose');

const dbConnetion = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicial la base de datos ver logs');

    }

}


module.exports = {
    dbConnetion
}