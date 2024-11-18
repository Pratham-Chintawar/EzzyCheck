# Fake product detection using blockchain

## Prerequisites

Before starting, make sure you have the following installed:

- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://truffleframework.com/ganache)
- [Metamask](https://metamask.io/)
- [NodeJs](https://nodejs.org/en/download/current/)

## Steps to follow for Local Setup(Ganache)

- Clone & install dependencies

```js
    git clone repoUrl .  // (OR Download Zip)
    npm install
```

- Modify truffle-config.js - uncomment development

```js
  development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
```

- Setup Ganache

  - start ganache gui, in ganache create your workspace and import private keys of account adderess in metamask for testing and connect them with ganache gui
  - Add Ganache GUI network in metamask
    Add Network
    ```bash
       Network name : Ganache GUI
       New RPC URL : HTTP://127.0.0.1:7545
       Chain ID: 1337
       Currency symbol: ETH
    ```

- Delete Build folder & Delete product.json present in src/ folder & src/js folder

- Compile & deploy smart contract

```js
    truffle compile
    truffle migrate
```

- Copy product.json which is created in build/contracts/ folder & Paste in in src/ folder & src/js folder.

- Copy ABI and contractAddress from product.json & Paste it in verifyProduct.html & consumerPurchaseHistory.html. You will get ABI & contract Address from product.json, product.json have 2 variables 1) abi 2)address in networks variable which is contract address

- Run Project

```js
    npm run dev
```

## Sample Data for Local blockchain

- 4 sample inputs givens in test/sampleInput.txt under the heading Input data for local blockchain on line no 87

## References

- Html5-qrcode docs , https://scanapp.org/blog/

- metamask connection setup with ganache, https://www.youtube.com/watch?v=jLFXONkA4KM

- deploying on goerli testnet , https://www.youtube.com/watch?v=b_k8yDC3hdM&feature=youtu.be

# Report Fake Product

1. consumer helpline

   Website url: https://consumerhelpline.gov.in/contact.php

   Mail: nch-ca@gov.in
