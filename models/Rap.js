const db = require('./db');
const Sequelize = require("sequelize");
const CumRap = require('./CumRap')
const Rap = db.define("Rap", {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    TenRap: {
        type: Sequelize.STRING,
        allowNull: false

    },
    LoaiRap: {
        type: Sequelize.STRING,
        allowNull: false
    },
    //MaCum
    KTNgang: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    KTDoc: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

Rap.belongsTo(CumRap)
module.exports = Rap