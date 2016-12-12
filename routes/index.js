/**
 * Created by vabole on 12.12.16.
 */
"use strict";
const express = require('express');
const router = express.Router();

const fs = require('fs');

router.get('/', function (req, res) {
    res.send('<p>some html</p>');
    //res.status(404).end();
});

router.post('/', function (req, res){
    const filename = (new Date()).toJSON();
    console.log(filename);
    console.log(req.body);
    res.json(res.body);
});

module.exports = router;