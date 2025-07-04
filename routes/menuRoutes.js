const express = require('express');
const MenuItem = require('./../models/Menu');
const routes = express.Router();

routes.post('/', async (req, res) => {
    try {
        const data = req.body;
        const menuData = new MenuItem(data);
        const response = await menuData.save();

        console.log("Mesu Added");
        res.status(200).json({ response });

    } catch (error) {
        console.log("Error occure in menu items: " + error);
        res.status(500).json({ error });
    }
});


routes.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Menu data fetch");
        res.status(200).json(data);
    } catch (error) {
        console.log("Error occure:");
        res.status(200).json(error);
    }
});

module.exports = routes;