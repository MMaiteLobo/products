const redis = require('redis');

// 1. Crear cliente de Redis
const client = redis.createClient({
    url: process.env.REDIS_URL
});

// 2. Manejar eventos de conexión
client.on('connect', () => {
    console.log('Conectado a Redis');
});

client.on('error', (err) => {
    console.error('Error de conexión a Redis', err);
});

// 3. Conectar al cliente
client.connect();

// 4. Exportar el cliente para usarlo en otros archivos
module.exports = client;