const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db')


router.get('/', (req, res) => {
    async function f2() {
        const genres = await db.getGenres();
        res.status(200).send(genres);
    }

    f2();
});

router.get('/:id', (req, res) => {
    async function f3() {
        const genre = await db.getGenre(parseInt(req.params.id));
        if (!genre || genre.length < 1) return res.status(404).send('genre with given id was not found');
        res.status(200).send(genre);
    }
    f3();
});

router.post('/', (req, res) => {
    const { error } = validateReq(req);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    async function f1() {
        const cnt = await db.getCnt();
        // console.log('cnt', cnt)
        const genre = {
            name: req.body.name,
            id: cnt + 1
        };
        const result = await db.createGenre(genre);
        res.status(200).send(result);
    }
    f1();
});

router.put('/:id', (req, res) => {
    const { error } = validateReq(req);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    async function f4() {
        const result = await db.updateGenre(parseInt(req.params.id), req.body.name);
        res.send(result);
    }
    f4();
});

router.delete('/:id', (req, res) => {
    async function f6() {
        const result = await deleteGenre(req.params.id)
        res.send(result);
    }
    f6()

});

function validateReq(req) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(req.body, schema);
}
module.exports = router;