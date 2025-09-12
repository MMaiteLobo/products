const typeService = require('../services/type.service');

const createType = async (req, res) => {
    const {name} = req.body;
    try {
        const newType = await typeService.createType({name});
        res.status(201).json(newType);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTypes = async (req, res) => {
    try {
        const types = await typeService.getTypes();
        res.status(200).json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTypeById = async (req, res) => {
    const {id} = req.params;
    try {
        const type = await typeService.getTypeById(id);

        if (!type) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.status(200).json(type);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createType,
    getTypes,
    getTypeById
};