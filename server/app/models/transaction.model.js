module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        wallet: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        },
        eth: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        action: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN
        },
    });

    return Transaction;
};
