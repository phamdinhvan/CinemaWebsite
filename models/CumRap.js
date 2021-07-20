const db = require('./db');
const Sequelize = require("sequelize");

const CumRap = db.define("CumRap", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    TenCum: {
        type: Sequelize.STRING,
        allowNull: false
    },
    DiaChi: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = CumRap