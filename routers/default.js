var express = require("express");
var Phim = require('../models/Phim');
var Rap = require('../models/Rap');
var CumRap = require('../models/CumRap');
var User = require('../models/User');
var SuatChieu = require('../models/SuatChieu');
var DatCho = require('../models/DatCho');
var moment = require("moment");
const asyncHandler = require('express-async-handler');

var router = express.Router();


//Hiển thị hình ảnh
router.get('/image/:id', asyncHandler(async function(req, res) {
    const phim = await Phim.findByPk(req.params.id);
    if (!phim || !phim.Poster) {
        res.status(404).send('File not found');
    } else {
        res.header('Content-Type', 'image/jpeg').send(phim.Poster);
    }
}))

router.get('/logout', async(req, res) => {
    delete req.session.userId
    res.redirect("/")
})

router.get("/", async function(req, res) {
    const phimMoiDuocChieu = await Phim.findAll({
        limit: 4,
        order: [
            ['createdAt', 'ASC']
        ]
    })
    const phim = await Phim.findAll({
        order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['NgayCongChieu', 'DESC']
        ]
    })
    res.render('index', { phimMoiDuocChieu, phim, moment });
});

router.post('/thongke', async function(req, res) {
    const to = req.body.to
    const go = req.body.go
    res.redirect('/admin/suatchieu');
});

router.get("*", async function(req, res) {
    res.redirect("/");
})

module.exports = router;