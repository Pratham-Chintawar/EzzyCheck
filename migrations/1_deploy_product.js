var product = artifacts.require("product");

module.exports = function (deployer) {
  deployer.deploy(product);
};

//Deployed on Ganache

/*

C:\Full Working\ant-main-local>truffle migrate --reset

Compiling your contracts...
===========================
> Compiling .\contracts\product.sol
> Artifacts written to C:\Full Working\ant-main-local\build\contracts
> Compiled successfully using:
   - solc: 0.8.12+commit.f00d7308.Emscripten.clang


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_deploy_product.js
===================

   Deploying 'product'
   -------------------
   > transaction hash:    0xc971b6fd2e1953d9737ccb072701b1fd2d656e156303030b5bb19759287b75b9
   > Blocks: 0            Seconds: 0
   > contract address:    0x3F39bbE57071D0bba43397e5c30A9625072cFb5b 
   > block number:        1
   > block timestamp:     1678895073
   > account:             0xD95C3786e63b0598FED3f2683F025e8fEdc903F0
   > balance:             99.9199158
   > gas used:            2002105 (0x1e8cb9)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0400421 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0400421 ETH

Summary
=======
> Total deployments:   1
> Final cost:          0.0400421 ETH

*/
