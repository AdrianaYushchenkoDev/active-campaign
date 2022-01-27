const { Router } = require("express");
const fetch = require('node-fetch');

const router = Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

router.get("/get-templates", async (req, res) => {
    try {
        const url = 'https://adrianayushchenko.api-us1.com//api/3/templates';
        const options = {method: 'GET', headers: { 'Api-Token': process.env.TOKEN, Accept: 'application/json'}};

        await fetch(url, options)
            .then(res => res.json())
            .then(json => res.status(200).json(json.templates))
            .catch(err => res.status(400).json(err));
    } catch (e) {
        return res.status(500).json({ errors: [{ message: `Server error` }] });
    }
});

router.post("/create-contact", async (req, res) => {
    try {
        const { template, contact } = req.body;
        const url1 = 'https://adrianayushchenko.api-us1.com/api/3/contacts';
        const options1 = {method: 'POST', headers: { 'Api-Token': process.env.TOKEN, Accept: 'application/json'}, body: JSON.stringify({ contact })};

        const retrievedContact = await fetch(url1, options1)
            .then(res => res.json())

        if (retrievedContact.errors) {
            return res.status(400).json({errors: retrievedContact.errors[0].title});
        }

        const options = {method: 'GET', headers: { 'Api-Token': process.env.TOKEN, Accept: 'application/json'}};

        const retrievedLists = await fetch('https://adrianayushchenko.api-us1.com/api/3/lists', options)
            .then(res => res.json())
            .catch(err => res.status(400).json(err));
        const { lists } = retrievedLists;
        const list = lists.find((list) => list.name === template);

        if (list) {
            const url2 = 'https://adrianayushchenko.api-us1.com/api/3/contactLists';
            const options2 = {method: 'POST', headers: { 'Api-Token': process.env.TOKEN, Accept: 'application/json'}, body: JSON.stringify({
                    "contactList": {
                        "list": list.id,
                        "contact": retrievedContact.contact.id,
                        "status": 1
                    }
                })};

            await fetch(url2, options2)
                .then(res => res.json())
                .then(json => res.status(201).json(json))
                .catch(err => res.status(400).json(err.title));
        }
    } catch (e) {
        return res.status(500).json({ errors: [{ message: `Server error` }] });
    }
});

module.exports = { basicRouter: router };
