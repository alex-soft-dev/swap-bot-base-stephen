const verifyToken = require("../middleware/index.js");

module.exports = app => {
  const tradingInfoController = require("../controllers/tradingInfo.controller.js");

  var router = require("express").Router();

  router.post("/startTrading", verifyToken, tradingInfoController.startTrading);
  router.get("/getLastTradingStatus", verifyToken, tradingInfoController.getLastTradingStatus);
  router.get("/getTradingStatus/:id", verifyToken, tradingInfoController.getTradingStatus);
  router.post("/stopTrading", tradingInfoController.stopTrading);

  app.use('/tradingInfos', router);
};
