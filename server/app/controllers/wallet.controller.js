const { btoa } = require("buffer");
const db = require("../models");
const ethers = require("ethers");
const LogManagement = require("../utils/logManagement");
const Wallet = db.wallets;

module.exports = {
  async createWallet(req, res) {
    try {
      const keypair = new ethers.Wallet.createRandom();

      // Create a Wallet
      const wallet = {
        address: JSON.stringify(keypair.address),
        privateKey: JSON.stringify(keypair.privateKey),
        balance: 0,
        active: false
      };

      await Wallet.create(wallet);
      LogManagement(`Wallet Created! - ${keypair.address}`, true)
      const wallets = await Wallet.findAll();


      res.status(200).json({ message: 'Wallet Created!', wallets: btoa(JSON.stringify(wallets)) });
    } catch (error) {
      LogManagement(`Wallet Created Server Error! - ${JSON.stringify(error)}`, false)
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
  async walletLists(req, res) {
    try {
      const wallets = await Wallet.findAll();

      res.status(200).json({ message: 'Wallet List!', wallets: btoa(JSON.stringify(wallets)) });
    } catch (error) {
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  },
  async getBalance(req, res) {
    try {
      const { walletAddress } = req.body;
      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
      const wei = await provider.getBalance(walletAddress);
      const eth = ethers.utils.formatEther(wei);

      res.status(200).json({ message: 'Balance', balance: eth });
    } catch (error) {
      res.status(500).json({ error: 'Error', 'Server Error:': error });
    }
  }
}