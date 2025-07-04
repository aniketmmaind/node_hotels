const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req, res) => {

    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        console.log("data saved");
        res.status(200).json(response);

    } catch (error) {
        console.log("Error :" + error);
        res.status(500).json({ error: "Internal Server Error!!" });
    }
});


router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fatched...");
        res.status(200).json(data);

    } catch (error) {
        console.log("Error occur during fetch: " + error);
        res.status(500).json({ error: error });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log("Response fetch");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log("Response fetch Error");
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,//Return the updated documents
            runValidators: true // Run mongoose validation
        });

        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }
        console.log("data updated");
        res.status(200).json(response);

    } catch (error) {
        console.log("error occur in updation");
        res.status(500).json({ error: error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: "Person Not Found" });
        }
        res.status(200).json(response);

    } catch (error) {
        console.log("Error Occur during deletion: " + error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;