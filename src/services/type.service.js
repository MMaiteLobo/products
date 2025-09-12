const db = require('../../db');

const createType = async (typeData) => {
    const {name} = typeData;
    const {rows} = await db.query(
        'INSERT INTO types (name) VALUES ($1) RETURNING *',
         [name]);
    return rows[0];
};

const getTypes = async () => {
    const {rows} = await db.query(
        'SELECT * FROM types'
    );
    return rows;
};

const getTypeById = async (id) => {
    const {rows} = await db.query(
        'SELECT * FROM types WHERE id = $1',
        [id]
    );
    return rows[0];
};

module.exports = {
    createType,
    getTypes,
    getTypeById
};
