const { ethers } = require("ethers");
const { Worker } = require('worker_threads');
const db = require("../models/index.js");
const LogManagement = require("../utils/logManagement.js");
const path = require('path');
const TradingInfo = db.tradnigInfos;
const WalletTable = db.wallets;

// Store workers for management
let workers = {};

function startApplication(walletId) {
  if (workers[walletId]) { // If exists from bugs
    LogManagement(`Application with Wallet ID ${walletId} already exists, removed it.`, true)
    workers[walletId].terminate();
    delete workers[walletId];
  }

  const dirname = __dirname;
  const desiredFilePath = __dirname + "/../../../bot/server.js"; // run the bot\server.js
  const worker = new Worker(desiredFilePath, {
    workerData: {walletId}
  });
  // Store reference to worker
  workers[walletId] = worker;
  LogManagement(`Application with Wallet ID ${walletId} has started.`, true)

  // Listen for messages from the worker and log them
  worker.on('message', (msg) => {
    if (msg.type === 'error' || msg.type === 'stderr') {
      LogManagement(`walletId ${walletId} -- ${msg.message}`, false)
    } else if (msg.type === 'stdout') {
      LogManagement(`walletId ${walletId} -- ${msg.message}`, true)
    }
  });
  worker.on('error', (err) => {
    console.error(`walletId ${walletId}:`, err);
  });
  // Clean up after the worker exits
  worker.on('exit', () => {
    LogManagement(`Application with Wallet ID ${walletId} has stopped.`, true)
    delete workers[walletId];
  });
}

function stopApplication(walletId) {
  if (workers[walletId]) {
    workers[walletId].terminate();
    LogManagement(`Terminating Application with Wallet ID ${walletId}.`, true)
  } else {
    LogManagement(`No running Application found with Wallet ID ${walletId}.`, true)
  }
}


module.exports = {
  async startTrading(req, res) {
    try {
      const { token, buyAmount, sellAmount, frequency, walletId, status, slippage } = req.body;

      await WalletTable.update({ active: false }, {
        where: {
          active: true
        }
      });
      await WalletTable.update({ active: true }, {
        where: {
          id: walletId
        }
      });

      const newTradingInfo = {
        token: token,
        buyAmount: buyAmount,
        sellAmount: sellAmount,
        frequency: frequency,
        slippage: slippage,
        walletId: walletId,
        status: status
      }

      await TradingInfo.create(newTradingInfo);

      const currentTrading = await TradingInfo.findOne({
        where: {
          status: true
        }
      })

      LogManagement(`Trading Started! - Wallet ID: ${JSON.stringify(newTradingInfo)}`, true)
      startApplication(walletId);
      res.status(200).json({ message: 'Trading Started!', currentTrading: currentTrading });
    } catch (error) {
      LogManagement(`Trading Started Server Error! - Wallet ID: ${JSON.stringify(error)}`, false)
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
  async getLastTradingStatus(req, res) {
    try {
      const staredTrading = await TradingInfo.findOne({
        order: [['createdAt', 'DESC']], // Replace 'createdAt' with your desired column
      });

      if (staredTrading === null) {
        res.status(300).json({ message: 'Started trading does not exist', currentTrading: staredTrading });
        return
      }

      const wallet = await WalletTable.findOne(
        {
          where: {
            id: parseInt(staredTrading.walletId)
          }
        });
      const walletAddress = (wallet.address).replace(/^"|"$/g, '');

      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
      const wei = await provider.getBalance(walletAddress);
      const eth = ethers.utils.formatEther(wei);

      res.status(200).json({ message: 'Trading Started!', currentTrading: staredTrading, selectedWallet: btoa(JSON.stringify(wallet)), balance: eth });
    } catch (error) {
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
  async getTradingStatus(req, res) {
    try {
      const { id } = req.params;
      const staredTrading = await TradingInfo.findOne({
        where: {
          walletId: id
        },
        order: [['createdAt', 'DESC']], // Replace 'createdAt' with your desired column
      });

      if (staredTrading === null) {
        res.status(300).json({ message: 'Started trading does not exist', currentTrading: staredTrading });
        return
      }

      const wallet = await WalletTable.findOne(
        {
          where: {
            id: id
          }
        });
      const walletAddress = (wallet.address).replace(/^"|"$/g, '');

      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
      const wei = await provider.getBalance(walletAddress);
      const eth = ethers.utils.formatEther(wei);

      // res.status(200).json({ message: 'Trading Started!'});
      res.status(200).json({ message: 'Trading Started!', currentTrading: staredTrading, selectedWallet: btoa(JSON.stringify(wallet)), balance: eth });
    } catch (error) {
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
  async stopTrading(req, res) {
    try {
      const { walletId } = req.body;
      await TradingInfo.update({ status: false }, {
        where: {
          walletId: walletId,
          status: true
        }
      });

      const latestInfo = await TradingInfo.findOne(
        {
          order: [['createdAt', 'DESC']],
          where: {
            walletId: walletId,
          }
        }
      )

      await WalletTable.update({ active: true }, {
        where: {
          id: walletId
        }
      });
      LogManagement(`Trading Stoped- Wallet ID: ${walletId}`, true)

      stopApplication(walletId);
      res.status(200).json({ message: 'Trading Stopd!', latestInfo: latestInfo });
    } catch (error) {
      LogManagement(`Trading Stoped Server Error - Wallet ID: ${walletId + JSON.stringify(error)}`, false)
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
}