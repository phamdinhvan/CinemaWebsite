const db = require('./db');
const Sequelize = require("sequelize");

const Phim = db.define('Phim', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Ten: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NgayCongChieu: {
        type: Sequelize.DATE,
        allowNull: false
    },
    Poster: {
        type: Sequelize.BLOB,
        allowNull: true
    },
    TraiLers: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ThoiLuong: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    DaoDien: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    DienVien: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    TheLoai: {
        type: Sequelize.TEXT,
        allowNull: false
    },
});

module.exports = Phim