App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    return await App.initWeb3();
  },

  initWeb3: function () {
    if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }

    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("product.json", function (data) {
      var productArtifact = data;
      App.contracts.product = TruffleContract(productArtifact);
      App.contracts.product.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-register", App.getData);
  },

  getData: function (event) {
    event.preventDefault();
    var productSN = document.getElementById("productSN").value;
    var consumerCode = document.getElementById("consumerCode").value;
    var productInstance;
    //window.ethereum.enable();
    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      // console.log(account);
      App.contracts.product
        .deployed()
        .then(function (instance) {
          productInstance = instance;
          return productInstance.verifyProduct(
            web3.fromAscii(productSN),
            web3.fromAscii(consumerCode),
            { from: account }
          );
        })
        .then(function (result) {
          // console.log(result);

          var t = "";

          var tr = "<tr>";
          if (result) {
            tr += "<td>" + "Genuine Product." + "</td>";
          } else {
            tr += "<td>" + "Fake Product." + "</td>";
          }
          tr += "</tr>";
          t += tr;

          document.getElementById("logdata").innerHTML = t;
          //   document.getElementById("add").innerHTML = account;
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});

// -----------------------------------NEW----------------------------------------------

// const alchemyEndpoint =
//   "https://eth-goerli.g.alchemy.com/v2/8-s3Z7nNxOkcHN4382LNoT1O3la-aYh5"; // replace YOUR_API_KEY with your Alchemy API key
// // const web3 = new Web3(alchemyEndpoint);

// const connectContract = async () => {
//   const ABI = [
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "productItems",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "productId",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes32",
//           name: "productSN",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "productName",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "productBrand",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "productPrice",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes32",
//           name: "productStatus",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       name: "productMap",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       name: "productsForSale",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       name: "productsManufactured",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       name: "productsSold",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "productsWithConsumer",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "productsWithSeller",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "sellers",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "sellerId",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes32",
//           name: "sellerName",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "sellerBrand",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "sellerCode",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "sellerNum",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes32",
//           name: "sellerManager",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "sellerAddress",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "sellersWithManufacturer",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_manufacturerId",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerName",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerBrand",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerCode",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "_sellerNum",
//           type: "uint256",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerManager",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerAddress",
//           type: "bytes32",
//         },
//       ],
//       name: "addSeller",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "viewSellers",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_manufactuerID",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_productName",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_productSN",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_productBrand",
//           type: "bytes32",
//         },
//         {
//           internalType: "uint256",
//           name: "_productPrice",
//           type: "uint256",
//         },
//       ],
//       name: "addProduct",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "viewProductItems",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_productSN",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_sellerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "manufacturerSellProduct",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_productSN",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_consumerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "sellerSellProduct",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_sellerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "queryProductsList",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_manufacturerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "querySellersList",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_consumerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "getPurchaseHistory",
//       outputs: [
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//         {
//           internalType: "bytes32[]",
//           name: "",
//           type: "bytes32[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "_productSN",
//           type: "bytes32",
//         },
//         {
//           internalType: "bytes32",
//           name: "_consumerCode",
//           type: "bytes32",
//         },
//       ],
//       name: "verifyProduct",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//       constant: true,
//     },
//   ];
//   const Address = "0x85F6B96b96F05F07F52AA39fE985a6ca6D5fF82B";
//   window.web3 = await new Web3(alchemyEndpoint);
//   window.contract = await new window.web3.eth.Contract(ABI, Address);
// };

// const readContract = async () => {
//   let aadhar = web3.utils.asciiToHex(8698125466);
//   //  console.log(aadhar);
//   let productSN = web3.utils.asciiToHex(1770993794);
//   //console.log(productSN);
//   const data = await window.contract.methods
//     .verifyProduct(productSN, aadhar)
//     .call();
//   console.log(data);
// };

// readContract();

console.log("exteral js");
