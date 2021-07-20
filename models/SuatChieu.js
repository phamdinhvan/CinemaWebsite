const db = require('./db');
const Sequelize = require("sequelize");
const Phim = require('./Phim');
const Rap = require('./Rap');

const SuatChieu = db.define('SuatChieu', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ThoiDiemBatDau: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ThoiDiemKetThuc: {
        type: Sequelize.STRING,
        allowNull: true
    },
    GiaVe: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});


SuatChieu.belongsTo(Phim)
SuatChieu.belongsTo(Rap)
module.exports = SuatChieu