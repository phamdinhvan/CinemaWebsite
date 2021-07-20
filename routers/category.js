var express = require("express");
var Phim = require("../models/Phim");
var Rap = require("../models/Rap");
var CumRap = require("../models/CumRap");
var User = require("../models/User");
var SuatChieu = require("../models/SuatChieu");
var DatCho = require("../models/DatCho");

var router = express.Router();

// var upload = require('../upload/upload');
var fs = require("fs");
var Promise = require("bluebird");
Promise.promisifyAll(fs);
var path = require("path");

// var cpUpload = upload.fields([{ name: 'anhphim', maxCount: 1 }])

const multer = require("multer");
const upload = multer({ storage: new multer.memoryStorage() });

router.get("/logout", async (req, res) => {
  delete req.session.userId;
  res.redirect("/");
});

router.post("/upload", upload.single("pic"), async (req, res) => {
  // let anhSave = req.files['anhphim'][0].originalname
  // let anhUpload = req.files['anhphim'][0].filename

  const pic = req.file.buffer;
  const {
    Ten,
    NgayCongChieu,
    TraiLers,
    ThoiLuong,
    DaoDien,
    DienVien,
    TheLoai,
  } = req.body;
  // const sourcePath_avatar = path.join(__dirname, '..', '..', 'uploads', anhUpload);
  // const destPath = path.join(__dirname, '..', '..', 'public', 'images', 'news', anhSave)
  // await fs.renameAsync(sourcePath_avatar, destPath)
  const listPhim = await Phim.findAll();
  console.log(listPhim);
  const all = listPhim.length;
  console.log(all);
  console.log(listPhim[all - 1]);
  console.log(listPhim[all - 1].id + 1);
  await Phim.create({
    id: listPhim[all - 1].id + 1,
    Ten: Ten,
    NgayCongChieu: NgayCongChieu,
    Poster: pic,
    TraiLers: TraiLers,
    ThoiLuong: ThoiLuong,
    DaoDien: DaoDien,
    DienVien: DienVien,
    TheLoai: TheLoai,
  });
  res.redirect("/admin/phim");
});

router.post("/deletephim/:id", async function (req, res) {
  await Phim.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/phim");
});

router.post("/insertcumrap", async function (req, res, next) {
  const listCumRap = await CumRap.findAll();
  const all = listCumRap.length;
  await CumRap.create({
    id: listCumRap[all - 1].id + 1,
    TenCum: req.body.TenCum,
    DiaChi: req.body.DiaChi,
  });
  res.redirect("/admin/cumrap");
});

router.post("/deletecumrap/:id", async function (req, res) {
  await CumRap.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/cumrap");
});

router.post("/insertrap", async function (req, res, next) {
  const listRap = await Rap.findAll();
  const all = listRap.length;
  await Rap.create({
    id: listRap[all - 1].id + 1,
    TenRap: req.body.TenRap,
    LoaiRap: req.body.LoaiRap,
    KTNgang: req.body.KTNgang,
    KTDoc: req.body.KTDoc,
    CumRapId: req.body.CumRapId,
  });
  res.redirect("/admin/rap");
});

router.post("/deleterap/:id", async function (req, res) {
  await Rap.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/rap");
});

router.post("/insertsuatchieu", async function (req, res, next) {
  const listSuatChieu = await SuatChieu.findAll();
  const all = listSuatChieu.length;
  await SuatChieu.create({
    id: listSuatChieu[all - 1].id + 1,
    ThoiDiemBatDau: req.body.TDBD,
    ThoiDiemKetThuc: req.body.TDKT,
    GiaVe: req.body.GiaVe,
    PhimId: req.body.idphim,
    RapId: req.body.idrap,
  });
  res.redirect("/admin/suatchieu");
});

router.post("/deletesuatchieu/:id", async function (req, res) {
  await SuatChieu.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.redirect("/admin/suatchieu");
});

router.get("/thongke", async function (req, res) {
  await DatCho.findAll({
    include: [
      {
        model: SuatChieu,
        include: [
          {
            model: Rap,
            include: [
              {
                model: CumRap,
              },
            ],
          },
        ],
      },
    ],
  }).then((user) => {
    res.render("indexadmin", { user });
  });
});
module.exports = router;
