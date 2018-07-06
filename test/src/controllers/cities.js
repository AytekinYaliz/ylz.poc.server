const express = require('express');


const router = express.Router()
   .get('/', getAll)
   .get('/:id', get)
;

const cities = [
     { id:1, name: 'london' },
     { id:2, name: 'leeds' }
];

async function getAll(req, res) {
     res.json( cities );
}

async function get(req, res) {
     const id = req.params.id;
     const city = await cities.find( x => String(x.id) === String(id) );
     res.json( city );
}

module.exports = router;
