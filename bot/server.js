const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const dotenv = require('dotenv');
const Moralis = require('moralis').default;
const { workerData } = require('worker_threads');

dotenv.config();

const db = require("../server/app/models/index");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const WalletDB = db.wallets;
const TransactionDB = db.transactions;
const TradingInfoDB = db.tradnigInfos;
const TradingLogDB = db.tradingLogs;

// Base mainnet rpc provider: https://mainnet.base.org
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);


// uniswapSwap router
const uniswapRouterABI = require("./ABIs/uniswapRouterABI.json");
const erc20ABI = require("./ABIs/erc20ABI.json");
const uniswapSwapRouterV2Address = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"; // uniswap router on Base
const ETHaddress = "0x4200000000000000000000000000000000000006"; // ETH address on Base
let callCount = 0; // it is for approve only once
//  Router function to interact with uniswapSwap Router
function router(ourWallet) {
  return new ethers.Contract(
    uniswapSwapRouterV2Address,
    uniswapRouterABI,
    ourWallet
  );
}

// Function to interact with the ERC20
function erc20(ourWallet, tokenAddress) {
  return new ethers.Contract(tokenAddress, erc20ABI, ourWallet);
}

async function getTradingInfo(walletId) {
  try {
    const staredTrading = await TradingInfoDB.findOne({
      order: [['createdAt', 'DESC']], // Replace 'createdAt' with your desired column
      where: {
        walletId: walletId
      }
    });


    if (staredTrading === null) {
      return
    }

    const walletInfo = await WalletDB.findOne(
      {
        where: {
          id: parseInt(walletId)
        }
      });

    const tokenAddress = await TradingInfoDB.findOne({
      where: {
        walletId: walletId,
        status: true
      }
    })

    const token = tokenAddress?.token;

    const walletAddress = (walletInfo.address).replace(/^"|"$/g, '');
    const wei = await provider.getBalance(walletAddress);
    const balance = ethers.utils.formatEther(wei);

    return { walletInfo, staredTrading, balance, token };
  } catch (error) {
    console.log("ERROR - ", error);
  }
}

async function stopTrading(walletId) {
  await TradingInfoDB.update({ status: false }, {
    where: {
      walletId: walletId,
      status: true
    }
  });
  
  await WalletDB.update({ active: true }, {
    where: {
      id: walletId
    }
  });

  console.log("Trading Stoped")
  callCount = 0;
  process.exit(1);
}

// Funtion to print transaction hash
function showTransactionHash(receipt, type) {
  // 0 - failed, 1 - success
  if (receipt && receipt.blockNumber && receipt.status === 1) {
    console.log(
      `${type} Transaction https://basescan.org/tx/${receipt.transactionHash} mined, status: success`
    );
  } else if (receipt && receipt.blockNumber && receipt.status === 0) {
    console.log(
      `${type} Transaction https://basescan.org/tx/${receipt.transactionHash} mined, status: failed`
    );
  } else {
    console.log(
      `${type} Transaction https://basescan.org/tx/${receipt.transactionHash} not mined`
    );
  }
}

async function getGasPrice() {
  const gasPrice = await provider.getGasPrice();
  const gas = ethers.utils.formatUnits(gasPrice, 'gwei');
  console.log('Current gas price: ', ethers.utils.formatUnits(gasPrice, 'gwei'), 'gwei');
  return gasPrice;
  
}

// Buy function (ETH -> ERC20)
async function buy(ourWallet, tokenAddress, amount, balance, walletIdTemp) {
  if (amount > balance) {
    console.log(`Insufficient Balance : ${ourWallet.address} `);
    createLog(`Insufficient Balance : ${ourWallet.address} `);
    stopTrading(walletIdTemp);
    return;
  }
  // How much we are going to buy. (ETH to Gwei)
  const buyAmount = ethers.utils.parseEther(amount.toString());
  // Fill up the transaction Swap
  const uniswapRouter = router(ourWallet);
  const gasPrice = await getGasPrice();
  const tx = await uniswapRouter.swapExactETHForTokensSupportingFeeOnTransferTokens(
    0,
    [ETHaddress, tokenAddress],
    ourWallet.address,
    Date.now() + 1000 * 60 * 10,
    {
      value: buyAmount.toString(),
      gasPrice: gasPrice * 2
    }
  );
  console.log("Buy txHash: - ", tx.hash); 
  const receipt = await tx.wait();

  const options = {
    chain: "0x2105",
    transactionHash: `${receipt.transactionHash}`
  }
  // const transactionDetails  = await Moralis.EvmApi.transaction.getTransactionVerbose(options);
  // let outputAmount = 0;
  // transactionDetails?.jsonResponse?.logs.forEach(log => {
  //   if (log?.decoded_event?.label === "Swap") {
  //     const params = log?.decoded_event?.params; 
  //     params.forEach(param => {
  //       if (param?.name == "amount1Out") {
  //         outputAmount = (param?.value) / (10 ** 9);
  //       }
  //     });
  //   }
  // });
  const temp = await router(ourWallet).getAmountsOut(buyAmount, [
    ETHaddress,
    tokenAddress,
  ]);
  const TokenContract = erc20(ourWallet, tokenAddress);
  const tokenDecimals = await TokenContract.decimals();
  console.log('tokenDecimals--', tokenDecimals);
  const outputAmount = ethers.utils.formatUnits(temp[1], parseInt(tokenDecimals));
  showTransactionHash(receipt, "Buy");
  saveTransaction(ourWallet.address.toString(), receipt.transactionHash, amount.toString(), outputAmount.toString(), tokenAddress, "BUY", true);

}

async function executeSwap(uniswapRouter, ethAmount, maxTokenAmount, tokenAddress, ourWallet, amount) {
  const gasPrice = await getGasPrice();
  const swap_txn =
    await uniswapRouter.swapTokensForExactETH(
      ethAmount, // Amount of ETH we want to receive
      maxTokenAmount, // Maximum amount of tokens to sell
      [tokenAddress, ETHaddress],
      ourWallet.address,
      Date.now() + 1000 * 60 * 10, 
      {
        gasPrice: gasPrice * 2
      }
    );
  console.log("Sell txHash: - ", swap_txn.hash); 
  const receipt = await swap_txn.wait();

  const options = {
    chain: "0x2105",
    transactionHash: `${receipt.transactionHash}`
  }
  // const transactionDetails  = await Moralis.EvmApi.transaction.getTransactionVerbose(options);

  // let inputAmount = 0;
  // transactionDetails?.jsonResponse?.logs.forEach(log => {
  //   if (log?.decoded_event?.label === "Swap") {
  //     const params = log?.decoded_event?.params; 
  //     params.forEach(param => {
  //       if (param?.name == "amount1In") {
  //         inputAmount = (param?.value) / (10 ** 9);
  //       }
  //     });
  //   }
  // });
  const temp = await router(ourWallet).getAmountsIn(ethAmount, [
    tokenAddress,
    ETHaddress
  ]);
  const TokenContract = erc20(ourWallet, tokenAddress);
  const tokenDecimals = await TokenContract.decimals();
  console.log('tokenDecimals--', tokenDecimals);
  const inputAmount = ethers.utils.formatUnits(temp[0], parseInt(tokenDecimals));
  showTransactionHash(receipt, "Sell");
  saveTransaction(ourWallet.address.toString(), receipt.transactionHash,  amount.toString(), inputAmount.toString(), tokenAddress, "SELL", true);
}

// Sell function (ERC20 -> ETH)
async function sell(ourWallet, tokenAddress, amount, balance, walletIdTemp) {
  if (amount > balance) {
    console.log(`Insufficient Balance : ${ourWallet.address} `);
    createLog(`Insufficient Balance : ${ourWallet.address} `);
    stopTrading(walletIdTemp);
    return;
  }
  const ethAmount = ethers.utils.parseEther(amount.toString()); // Amount of ETH we want to receive
  const maxTokenAmount = ethers.utils.parseUnits("999999999999999999999999999999999999999999999999", 18);
  // Approve Pancacke swap to manage our tokens.
  const uniswapRouter = router(ourWallet);
  // Check allowance
  // const allowance = await uniswapRouter.allowance(ourWallet.address, uniswapSwapRouterV2Address);
  if (callCount == 1) {
    // Allowance is not sufficient, so we need to approve
    const sellTokenContract = erc20(ourWallet, tokenAddress);
    const gasPrice = await getGasPrice();
    const approve = await sellTokenContract.approve(
      uniswapSwapRouterV2Address,
      maxTokenAmount, {
        gasPrice: gasPrice * 2
      }
    );
    const receipt_approve = await approve.wait();
    if (
      receipt_approve &&
      receipt_approve.blockNumber &&
      receipt_approve.status === 1
    ) {
      // Approval successful, proceed with the swap
      await executeSwap(uniswapRouter, ethAmount, maxTokenAmount, tokenAddress, ourWallet, amount);
    }
  } else {
    // Allowance is sufficient, proceed with the swap
    await executeSwap(uniswapRouter, ethAmount, maxTokenAmount, tokenAddress, ourWallet, amount);
  }
}

async function saveTransaction(walletAddress, hash, eth, token, address, action, status) {
  const newTransaction = {
    wallet: walletAddress, // wallet address 
    hash: hash, //transaction hash
    eth: eth, // ETH amount
    token: token, // token Amount
    address: address,  // token address
    action: action, // Buy or Sell
    status: status, // true or false
  }
  await TransactionDB.create(newTransaction);
}

async function createLog(content) {
  const newLog = {
    logContent: content
  }

  await TradingLogDB.create(newLog);
}

const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

async function main() {
  await Moralis.start({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJjMzcwZDJiLWJmZjctNGNmOS1hNzcxLTAxZTliNmNjYWRhOCIsIm9yZ0lkIjoiMzg2MDA2IiwidXNlcklkIjoiMzk2NjMzIiwidHlwZUlkIjoiNTZmMmViZGQtOWFjNi00ODhhLTgyYTctNTAwZjM1ZGFhMjRlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTIwODAzMTEsImV4cCI6NDg2Nzg0MDMxMX0.mY137EDP7eNakMFe--a6L2AmEuxfkzoj440ll_3N8j4"
  });
  // const walletId = process.argv[2]; // parameter 1
  const { walletId } = workerData;
  while (1) {
    try {
      const result = await getTradingInfo(walletId);
      if (!result) {
        console.log(`getTradingInfo: walletID-${walletId} is null`);
      }
      const { walletInfo, staredTrading, balance, token } = result;
      if (staredTrading.status === true) {
        // our Wallet
        const privateKey = new ethers.Wallet(JSON.parse(walletInfo.privateKey));
        const wallet = privateKey.connect(provider); // private key wallet

        const tokenAddress = token;
        callCount += 1;
        await buy(wallet, tokenAddress, staredTrading.buyAmount, balance, walletId); // Buy Token
        await wait(staredTrading.frequency * 1000);
        await sell(wallet, tokenAddress, staredTrading.sellAmount, balance, walletId); // Sell Token
        await wait(staredTrading.frequency * 1000);
      } else {
        callCount = 0;
      }
    }
    catch (error) {
      console.error('error ', error);
      stopTrading(walletId);
    }
  }
}

main();