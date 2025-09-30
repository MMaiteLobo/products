const { Client } = require('pg');

let client = null;

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
        
        await client.connect();
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.error('Error al conectar a la base de datos', err.stack);
    }
};

// Función para obtener el cliente (solo después de conectar)
const getClient = () => {
    if (!client) {
        throw new Error('Base de datos no conectada. Llame a connectDB() primero.');
    }
    return client;
};

module.exports = { getClient, connectDB };