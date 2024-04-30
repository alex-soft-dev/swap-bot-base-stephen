const db = require('../models/index');
const LogList = db.tradingLogs;

async function LogManagement(content, status) {
    const newLog = {
        logContent: `${content}`
    }
    await LogList.create(newLog)

    if(status === true) {
        console.log(content);
    }
    else {
        console.error(content);
    }

}

module.exports = LogManagement;