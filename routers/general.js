const fs = require('fs');
const router = require('express').Router();
const auth = require('../controller/Auth');
const getSchema = require('../controller/Schema');
const method = require('../controller/methods');

router.get('/schemas', async (req, res, next) => {
    try {
        const schemaList = fs.readdirSync('./database/schema/');
        auth(req, res, next);
        res.send({ success: true, schemas: schemaList.map(v => v.replace('.js', '')) });

    } catch (e) {
        res.send({ success: false, message: e.message });
    };
});

router.get('/schema/:query', async (req, res, next) => {
    try {
        auth(req, res, next);
        const reqdb = req.params.query;

        const schema = getSchema(reqdb, res);
        if (schema.success === false) {
            return res.send({ success: false, message: schema.message });
        }
        const getData = await method.findAll(schema);

        res.send(getData);
    } catch (e) {
        res.send({ success: false, message: e.message });
    };
});

router.delete('/schema/:query', async (req, res, next) => {
    try {
        auth(req, res, next);
        const reqdb = req.params.query;
        const filter = req.query.filter;

        const schema = getSchema(reqdb, res);
        if (schema.success === false) {
            return res.send({ success: false, message: schema.message });
        }
        const json = JSON.parse(filter);
        const getData = await method.findOneAndDelete(schema, json);

        res.send({ success: true, deletedObj: getData });
    } catch (e) {
        res.send({ success: false, message: e.message });
    };
});

router.post('/schema/:query', async (req, res, next) => {
    try {
        auth(req, res, next);
        const reqdb = req.params.query;
        const json = req.body;

        const schema = getSchema(reqdb, res);
        if (schema.success === false) {
            return res.send({ success: false, message: schema.message });
        }

        const getData = await method.create(schema, json);

        res.send({ success: true, createdObj: getData });
    } catch (e) {
        res.send({ success: false, message: e.message });
    };
});
module.exports = router;