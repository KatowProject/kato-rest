const router = require('express').Router();
const auth = require('../controller/Auth');

router.get('/', async (req, res, next) => {

    try {
        auth(req, res, next);
        res.send({ success: true, statusCode: 200 });

    } catch (e) {

        res.send({ success: false, message: e.message });

    };

});

router.get('/:schema', async (req, res, next) => {



});


module.exports = router;